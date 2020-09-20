type Subscribe<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

// export function Observable() {

//    let subscribers: Subscribers = []

//    function subscribe<TValue>(fn: Subscribe<TValue>) {
//       subscribers = [...subscribers, fn]
//       return () => {
//          subscribers.filter(subscriber => subscriber !== fn)
//       }
//    }

//    function notify<TValues>(data: TValues) {
//       subscribers.forEach(subscriber => subscriber(data))
//    }

//    return {
//       notify,
//       subscribe
//    }
// }


class Observable<T extends {}> {
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

export const state = <T>(state: T) => new Observable(state)