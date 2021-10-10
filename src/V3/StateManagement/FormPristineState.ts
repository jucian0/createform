import { ObservableForm } from './Observable'

export class FormPristineState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFieldsPristine(values: T) {
      this.set(values)
      this.notify()
   }

   setFieldPristine(field: string, value: boolean) {
      this.setFieldPristine(field, value as any)
      this.notify()
   }

   resetFieldsPristine() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldPristine(field: string) {
      this.patch(field, false as any)
      this.notify()
   }

   getFieldsPristine() {
      return this.get()
   }

   getFieldPristine(field: string) {
      return this.get()[field]
   }
}
