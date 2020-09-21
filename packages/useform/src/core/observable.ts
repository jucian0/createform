import dotPropImmutable from "dot-prop-immutable"

type Subscribe<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

interface State {
   values: any
   errors: any,
   touched: any
}

export class Observable<T extends State> {
   private state: T = Object.assign({})
   private subscribers: Subscribers<T> = []

   constructor(state: T) {
      this.state = state
   }

   get get() {
      return this.state
   }

   set set(values: T) {
      this.state = { ...this.state, ...values }
      this.notify()
   }

   subscribe(fn: Subscribe<T>) {
      this.subscribers = [...this.subscribers, fn]

      return () => {
         this.subscribers = this.subscribers.filter(subscribe => subscribe !== fn)
      }
   }

   notify() {
      this.subscribers.forEach(fn => fn(this.get))
   }
}
