import dotPropImmutable from "dot-prop-immutable"

type Subscribe<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

export interface State<T> {
   values: T
   errors: T,
   touched: T
}

export class Observable<T extends State<T>> {
   private state: State<T> = Object.assign({})
   private subscribers: Subscribers<State<T>> = []

   constructor(state: State<T>) {
      this.state = state
   }

   get get() {
      return this.state
   }

   set set(values: State<T>) {
      this.state = { ...this.state, ...values }
      this.notify()
   }

   subscribe(fn: Subscribe<State<T>>) {
      this.subscribers = [...this.subscribers, fn]

      return () => {
         this.subscribers = this.subscribers.filter(subscribe => subscribe !== fn)
      }
   }

   notify() {
      this.subscribers.forEach(fn => fn(this.get))
   }
}
