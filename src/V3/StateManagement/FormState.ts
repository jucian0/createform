import { ObservableForm } from './Observable'
export class FormState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T = {} as T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFormValues(values: T) {
      this.set(values)
   }

   setFieldValue(field: string, value: any) {
      this.patch(`values.${[field]}`, value as any)
   }

   resetFormValues() {
      this.set(this.initialState)
   }

   resetFieldValue(field: string) {
      this.patch(`values.${[field]}`, null as any)
   }

   getFormState() {
      return this.get()
   }

   getFieldValue(field: string) {
      return this.getProperty(`values.${field}`)
   }

   getInitialStateValues() {
      return this.initialState
   }

   setFieldError(field: string, error: string) {
      this.patch(`errors.${field}`, error as any)
   }

   setFieldTouched(field: string, touched: boolean) {
      this.patch(`touched.${field}`, touched as any)
   }
}
