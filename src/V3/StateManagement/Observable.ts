import { get, set } from 'object-path-immutable'

type Observer = (...args: any[]) => void
type Observers = Set<Observer>

interface Observable<T> {
   set: (state: T) => void
   patch: (path: string, state: T) => void
   subscribe: (observer: Observer) => void
   get: () => T
}

export class ObservableForm<T extends {}> implements Observable<T> {
   private observers: Observers

   constructor(private state: T) {
      this.observers = new Set()
      this.state = state
   }

   set(state: T) {
      this.state = state
      this.notify()
   }

   patch(path: string, state: Partial<T>) {
      const value = get(this.state, path)
      if (value !== state) {
         this.state = set(this.state, path, state)
         this.notify()
      }
   }

   subscribe(observer: Observer) {
      this.observers.add(observer)

      return () => {
         this.observers.delete(observer)
      }
   }

   get() {
      return this.state
   }

   getProperty(path: string) {
      return get(this.state, path)
   }

   notify() {
      console.log('notify', this.state)
      this.observers.forEach(observer => observer(this.state))
   }
}
