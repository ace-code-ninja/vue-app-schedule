export type CallbackFunction<CallbackType> = (data: CallbackType | null) => void
export type CallbackUnregisterFunction = () => void
export type CallbackID = number

export class CallbackManager<CallbackType> {
  #cb_id: CallbackID = 0
  #callbacks: Map<number, CallbackFunction<CallbackType>> = new Map()

  register(callback: CallbackFunction<CallbackType>): CallbackUnregisterFunction {
    this.#cb_id++
    const id = this.#cb_id
    this.#callbacks.set(id, callback)
    return this.unregister.bind(this, id)
  }

  unregister(id: CallbackID) {
    if (this.#callbacks.has(id)) this.#callbacks.delete(id)
  }

  call(data: CallbackType) {
    for (const [id, cb] of this.#callbacks) {
      id
      cb(data)
    }
  }

  count() {
    return this.#callbacks.size
  }
}
