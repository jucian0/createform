type Subscribe<TValues> = (e: TValues) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

export function createState<T extends object>(
   initialState: T = Object.assign({})
) {
   let state = initialState
   let subscribers: Subscribers<T> = []

   function getState() {
      return state
   }

   function subscribe(fn: Subscribe<T>) {
      subscribers = [...subscribers, fn]

      return () => {
         subscribers = subscribers.filter(l => l !== fn)
      }
   }

   function setState(next: Partial<T> | ((state: T) => T)) {
      const nextState = typeof next === 'function' ? next(getState()) : next
      state = {
         ...state,
         ...nextState
      }
      notify()
   }

   function notify() {
      subscribers.forEach(fn => {
         fn(getState())
      })
   }

   return {
      getState,
      setState,
      subscribe
   }
}
