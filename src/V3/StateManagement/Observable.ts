import { set } from './ObjectPath'

type Observer = (...args: any[]) => void
type Observers = Set<Observer>

interface Observable<T> {
   set: (state: T) => void
   patchState: (path: string, state: T) => void
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
   }

   patchState(path: string, state: Partial<T>) {
      this.state = set(this.state, path, state)
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

   notify() {
      console.log('notify', this.state)
      this.observers.forEach(observer => observer(this.state))
   }
}
