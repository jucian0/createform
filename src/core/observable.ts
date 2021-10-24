import * as dot from './dot-prop'

type Subscribe<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

export function createState<T extends object>(
   initialState: T = Object.assign({})
) {
   let state = initialState
   let subscribers: Subscribers<T> = []

   function get() {
      return state
   }

   function subscribe(fn: Subscribe<T>) {
      subscribers = [...subscribers, fn]

      return () => {
         subscribers = subscribers.filter(l => l !== fn)
      }
   }

   function set(next: Partial<T> | ((state: T) => T)) {
      const nextState = typeof next === 'function' ? next(get()) : next
      state = nextState

      notify()
   }

   function patch(path: string, next: any) {
      const nextState = dot.set(state, path, next)
      state = nextState
      notify()
   }

   function getPropertyValue(path: string) {
      return dot.get(state, path)
   }

   function notify() {
      subscribers.forEach(fn => {
         fn(get())
      })
   }

   return {
      get,
      set,
      patch,
      subscribe,
      getPropertyValue
   }
}
