type Observer = (...args: any[]) => void
type Observers = Set<Observer>

interface Observable<T> {
   set: (state: T) => void
   patchState: (state: T) => void
   subscribe: (observer: Observer) => void
   get: () => T
}

class ObservableForm<T> implements Observable<T> {
   private observers: Observers

   constructor(private state: T) {
      this.observers = new Set()
   }

   set(state: T) {
      this.state = state
   }

   patchState(state: Partial<T>) {
      this.state = Object.assign(this.state, state)
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
      this.observers.forEach(observer => observer(this.state))
   }
}
