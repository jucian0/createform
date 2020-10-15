
type Subscribe<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

export class Observable<T> {
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

export function createState(initialState = {}) {
   let state = initialState;
   let subscribers = [];

   function getState() {
      return state;
   }

   function subscribe(fn) {
      subscribers = [...subscribers, fn];

      return () => {
         subscribers = subscribers.filter((l) => l !== fn);
      };
   };

   function setState(newState) {
      state = {
         ...state,
         ...newState
      };

      notify()
   }

   function notify() {
      subscribers.forEach((fn) => {
         fn(getState());
      });
   }

   return {
      getState,
      setState,
      subscribe,
   };
};