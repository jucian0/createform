import { ObservableForm } from './Observable'

export class FormTouchedState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFieldsTouched(values: T) {
      this.set(values)
      this.notify()
   }

   setFieldTouched(field: string, value: boolean) {
      if (this.getProperty(field) !== value) {
         this.patch(field, value as any)
         this.notify()
      }
   }

   resetFieldsTouched() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldTouched(field: string) {
      this.patch(field, false as any)
      this.notify()
   }

   getFieldsTouched() {
      return this.get()
   }

   getFieldTouched(field: string) {
      return this.get()[field]
   }

   getInitialTouched() {
      return this.initialState
   }
}
