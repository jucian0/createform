import { ObservableForm } from './Observable'
export class FormValuesState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T = {} as T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFormValue(values: T) {
      this.set(values)
      this.notify()
   }

   setFieldValue(field: string, value: any) {
      this.patch(field, value as any)
      this.notify()
   }

   resetFormValues() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldValue(field: string) {
      this.patch(field, null as any)
      this.notify()
   }

   getFormValues() {
      return this.get()
   }

   getFieldValue(field: string) {
      return this.get()[field]
   }

   getInitialStateValues() {
      return this.initialState
   }
}