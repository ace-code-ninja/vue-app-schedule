import { get_browser_id } from './cookies'
import {
  CallbackManager,
  type CallbackFunction,
  type CallbackUnregisterFunction
} from '@/modules/callback_manager'
import { RollingTimer } from './rolling_timer'
import { known_buttons } from './defaults'

export type BarState = Map<string, boolean>
export type SystemState = Map<string, BarState>

export type StatusCallbackFunction = CallbackFunction<BarState>
export type StateCallbackFunction = CallbackFunction<SystemState>

export interface API {
  uuid: () => string
  is_authenticated: () => boolean
  is_admin: () => boolean
  connected: () => Promise<boolean>
  get_status: (id?: string) => Promise<BarState | null>
  watch_status: (status_cb: StatusCallbackFunction, id?: string) => CallbackUnregisterFunction
  set_status: (id: string, state: BarState) => Promise<BarState | null>
  get_state: () => Promise<SystemState | null>
  watch_state: (state_cb: StateCallbackFunction) => CallbackUnregisterFunction
}

const test_bar_names = ['test-bar-1', 'test-bar-2', 'test-bar-3', 'test-bar-4']

const polling_interval_ms = 5000

class EmulatedAPI implements API {
  #user_id: string
  #browser_id: string

  #status_cbs = new Map<string, CallbackManager<BarState | null>>()
  #state_cbs = new CallbackManager<SystemState | null>()

  #status_checker = new RollingTimer(polling_interval_ms, this.#status_checker_cb.bind(this))
  #state_checker = new RollingTimer(polling_interval_ms, this.#state_checker_cb.bind(this))

  #state: SystemState = new Map()

  constructor(user_id: string = '') {
    this.#user_id = user_id
    this.#browser_id = get_browser_id()

    console.log(`Browser ID: ${this.#browser_id}`)

    this.#generate_state_data()
  }

  #generate_state_data() {
    for (const name of test_bar_names) {
      const status: BarState = new Map()
      for (const id of known_buttons.keys()) {
        if (Math.random() > 0.5) {
          status.set(id, true)
        }
      }

      this.#state.set(name, status)
    }
  }

  uuid() {
    return this.#browser_id
  }

  async connected() {
    return true
  }

  is_authenticated() {
    return Boolean(this.#user_id)
  }

  is_admin() {
    return true
  }

  async get_status(id: string = '') {
    if (!id) {
      id = this.#browser_id
    }

    //Only allow for admin user or for item matching this instance
    if (!this.#user_id && id != this.#browser_id) return null

    const status = this.#state.get(id)
    if (!status) return null

    return status
  }

  watch_status(status_cb: StatusCallbackFunction, id?: string) {
    if (!id) {
      id = this.#browser_id
    }

    let cb_m = this.#status_cbs.get(id)
    if (!cb_m) {
      cb_m = new CallbackManager<BarState | null>()
      this.#status_cbs.set(id, cb_m)
    }

    const cb = cb_m.register(status_cb)

    if (!this.#status_checker.running()) {
      console.log('Started status checker')
      this.#status_checker.start()
    }

    return this.#unwatch_status.bind(this, cb)
  }

  #unwatch_status(cb: CallbackUnregisterFunction) {
    cb()

    //Check all of our current callbacks to see if there are any still lodged
    for (const cb_m of this.#status_cbs.values()) {
      if (cb_m.count()) return
    }

    //If not, stop the checker
    this.#status_checker.stop()
  }

  async #status_checker_cb() {
    console.log('[Status check]')

    let count = 0

    for (const [id, cb_m] of this.#status_cbs) {
      if (!cb_m.count()) continue

      const status = await this.get_status(id)
      cb_m.call(status)

      count += 1
    }

    return count > 0
  }

  async set_status(id: string, state: BarState) {
    //Only allow for admin user or for item matching this instance
    if (!this.#user_id && id != this.#browser_id) return null

    this.#state.set(id, state)
    return state
  }

  async get_state() {
    if (!this.#user_id) return null

    return this.#state
  }

  watch_state(state_cb: StateCallbackFunction) {
    const cb = this.#state_cbs.register(state_cb)

    if (!this.#state_checker.running()) {
      this.#state_checker.start()
    }

    return this.#unwatch_state.bind(this, cb)
  }

  #unwatch_state(cb: CallbackUnregisterFunction) {
    cb()

    //Check all of our current callbacks to see if there are any still lodged
    if (this.#state_cbs.count()) return

    //If not, stop the checker
    this.#state_checker.stop()
  }

  async #state_checker_cb() {
    console.log('[State check]')

    if (!this.#state_cbs.count()) return false

    const state = await this.get_state()
    this.#state_cbs.call(state)

    return true
  }
}

const url_prefix = '/api'
const version_prefix = '/v2'

class RealAPI implements API {
  #user_id: string
  #browser_id: string

  #status_cbs = new Map<string, CallbackManager<BarState | null>>()
  #state_cbs = new CallbackManager<SystemState | null>()

  #status_checker = new RollingTimer(polling_interval_ms, this.#status_checker_cb.bind(this))
  #state_checker = new RollingTimer(polling_interval_ms, this.#state_checker_cb.bind(this))

  constructor(user_id: string = '') {
    this.#user_id = user_id
    this.#browser_id = get_browser_id()

    console.log(`Browser ID: ${this.#browser_id}`)
  }

  uuid() {
    return this.#browser_id
  }

  is_authenticated() {
    return Boolean(this.#user_id)
  }

  is_admin() {
    //TODO:
    return true
  }

  async #extract_json(response: Response) {
    // console.log(response);

    const content_type = response.headers.get('content-type')
    if (!content_type || content_type.indexOf('application/json') < 0) return null

    const content_length = response.headers.get('content-length')
    if (!content_length || !Number(content_length)) return null

    let j = null
    try {
      j = JSON.parse(await response.text())
    } catch (e) {
      console.warn(e)
    }

    return j
  }

  async connected() {
    const response = await fetch(url_prefix + '/version', {
      method: 'GET',
      headers: { Accept: 'application/json; charset=utf-8' }
    })

    if (!response.ok) return false

    const j = await this.#extract_json(response)

    return j ? j.id === 'peto' : false
  }

  #clean_status(j: any) {
    const status: BarState = new Map()
    for (const [key, value] of Object.entries(j)) {
      status.set(key, Boolean(value))
    }

    return status
  }

  async get_status(id: string = '') {
    if (!id) {
      id = this.#browser_id
    }

    //Only allow for admin user or for item matching this instance
    if (!this.#user_id && id != this.#browser_id) return null

    const response = await fetch(url_prefix + version_prefix + `/${id}/status`, {
      headers: {
        Accept: 'application/json; charset=utf-8'
      },
      method: 'GET'
    })

    if (!response.ok) return null

    const j = await this.#extract_json(response)

    return j && j.state ? this.#clean_status(j.state) : null
  }

  watch_status(status_cb: StatusCallbackFunction, id?: string) {
    if (!id) {
      id = this.#browser_id
    }

    let cb_m = this.#status_cbs.get(id)
    if (!cb_m) {
      cb_m = new CallbackManager<BarState | null>()
      this.#status_cbs.set(id, cb_m)
    }

    const cb = cb_m.register(status_cb)

    if (!this.#status_checker.running()) {
      this.#status_checker.start()
    }

    return this.#unwatch_status.bind(this, cb)
  }

  #unwatch_status(cb: CallbackUnregisterFunction) {
    cb()

    //Check all of our current callbacks to see if there are any still lodged
    for (const cb_m of this.#status_cbs.values()) {
      if (cb_m.count()) return
    }

    //If not, stop the checker
    this.#status_checker.stop()
  }

  async #status_checker_cb() {
    console.log('[Status check]')

    let count = 0

    for (const [id, cb_m] of this.#status_cbs) {
      if (!cb_m.count()) continue

      const status = await this.get_status(id)
      cb_m.call(status)

      count += 1
    }

    return count > 0
  }

  async set_status(id: string, state: BarState) {
    //Only allow for admin user or for item matching this instance
    if (!this.#user_id && id != this.#browser_id) return null

    const data = Object.fromEntries(state.entries())
    const response = await fetch(url_prefix + version_prefix + `/${id}/status`, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Accept: 'application/json; charset=utf-8'
      },
      method: 'PUT',
      body: JSON.stringify(data)
    })

    if (!response.ok) return null

    const j = await this.#extract_json(response)

    return j && j.state ? this.#clean_status(j.state) : null
  }

  async get_state() {
    if (!this.#user_id) return null

    const response = await fetch(url_prefix + version_prefix + `/state`, {
      headers: {
        Accept: 'application/json; charset=utf-8'
      },
      method: 'GET'
    })

    if (!response.ok) return null

    const j = await this.#extract_json(response)

    const statuses: SystemState = new Map()
    for (const [key, val] of Object.entries(j)) {
      const bar: any = val
      const status = bar && bar.state ? this.#clean_status(bar.state) : null
      if (status) statuses.set(key, status)
    }

    return statuses
  }

  watch_state(state_cb: StateCallbackFunction) {
    const cb = this.#state_cbs.register(state_cb)

    if (!this.#state_checker.running()) {
      this.#state_checker.start()
    }

    return this.#unwatch_state.bind(this, cb)
  }

  #unwatch_state(cb: CallbackUnregisterFunction) {
    cb()

    //Check all of our current callbacks to see if there are any still lodged
    if (this.#state_cbs.count()) return

    //If not, stop the checker
    this.#state_checker.stop()
  }

  async #state_checker_cb() {
    console.log('[State check]')

    if (!this.#state_cbs.count()) return false

    const state = await this.get_state()
    this.#state_cbs.call(state)

    return true
  }
}

declare let process: any
const is_production = process.env.NODE_ENV === 'production'
export const api: API = is_production ? new RealAPI('test_admin') : new EmulatedAPI('test_admin')
