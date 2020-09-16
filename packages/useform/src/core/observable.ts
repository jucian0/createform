import dot from 'dot-prop-immutable'

type Subscriber<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscriber<TValues>>

// export function Observer() {

//    let subscribers: Subscribers = []

//    function subscriber<TValue>(fn: Subscriber<TValue>) {
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
//       subscriber
//    } 
// }


export class Observable<T extends {}> {
   private state: T = Object.assign({})
   private subscribers: Subscribers<T> = []

   constructor(state: T) {
      this.state = state
   }

   get get() {
      return this.state
   }

   set set(values: T) {
      this.state = values
      this.notify
   }

   subscribe(fn: Subscriber<T>) {
      this.subscribers = [...this.subscribers, fn]

      return () => {
         this.subscribers = this.subscribers.filter((subscribe) => subscribe !== fn)
      }
   }

   notify() {
      this.subscribers.forEach((fn) => fn(this.get))
   }
}