import dot from 'dot-prop-immutable'
import { Subscribers, OnChange, Subscriber } from '../Types'

class State<T extends {}> {
  private state: T = Object.assign({})
  private initialState: T = Object.assign({})

  private subscribers: Subscribers<T> = []

  constructor(state: T) {
    this.state = state
    this.initialState = state
  }

  get getState() {
    return this.state
  }

  set setState(values: T) {
    this.state = values
    this.notify
  }

  change({ value, fieldPath }: OnChange) {
    this.state = dot.set(this.state, fieldPath, value)
    this.notify(fieldPath)
  }

  reset() {
    this.state = this.initialState
    this.notify()
  }

  resetInput(fieldPath: string) {
    const value = dot.get(this.initialState, fieldPath)
    this.state = dot.set(this.state, fieldPath, value)
    this.notify(fieldPath)
  }

  getValue(path: string) {
    return dot.get(this.state, path)
  }

  subscribe(fn: Subscriber<T>) {
    this.subscribers = [...this.subscribers, fn]

    return () => {
      this.subscribers = this.subscribers.filter((subscribe) => subscribe !== fn)
    }
  }

  notify(...args: Array<string>) {
    this.subscribers.forEach((fn) => fn(this.getState, args[0]))
  }
}

export default State
