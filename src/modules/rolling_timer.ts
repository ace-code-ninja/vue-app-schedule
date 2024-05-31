export type RollingTimerCallback = () => Promise<boolean> | boolean

export class RollingTimer {
  #id: number | null = null
  interval_ms: number
  callback: RollingTimerCallback

  constructor(interval_ms: number, callback: RollingTimerCallback) {
    this.interval_ms = interval_ms
    this.callback = callback
  }

  running() {
    return this.#id != null
  }

  start() {
    if (this.#id != null) return

    this.tick()
    // this.#id = setTimeout(this.tick, 5000);
  }

  stop() {
    if (this.#id == null) return

    clearTimeout(this.#id)
    this.#id = null
  }

  #tick_sync(result: boolean) {
    if (result) {
      this.#id = setTimeout(this.tick.bind(this), this.interval_ms)
    } else {
      this.stop()
    }
  }

  tick() {
    const answer = this.callback()
    if (answer instanceof Promise) {
      answer.then(this.#tick_sync.bind(this))
    } else {
      this.#tick_sync(answer)
    }
  }
}
