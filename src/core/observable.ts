import { State } from '../types'
import * as dot from './dot-prop'

type Subscribe<TValues> = (e: State<TValues>) => void
type Subscribers<TValues = {}> = Array<Subscribe<TValues>>

export function createState<T extends State<T>>(
   initialState: T = Object.assign({})
) {
   let state = initialState
   let subscribers: Subscribers<T> = []

   function get(): State<T> {
      return state
   }

   function subscribe(fn: Subscribe<T>) {
      subscribers = [...subscribers, fn]

      return () => {
         subscribers = subscribers.filter(l => l !== fn)
      }
   }

   function set(nextState: T) {
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

   function getInitialPropertyValue(path: string) {
      return dot.get(initialState, path)
   }

   function getInitialState(): State<T> {
      return initialState
   }

   function notify() {
      console.log('notify', subscribers.length)
      subscribers.forEach(fn => {
         fn(get())
      })
   }

   return {
      get,
      set,
      patch,
      subscribe,
      getPropertyValue,
      getInitialState,
      getInitialPropertyValue
   }
}
