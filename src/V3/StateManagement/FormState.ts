import { ObservableForm } from './Observable'
export class FormState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T = {} as T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFormValue(values: T) {
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

   getFormValues() {
      return this.get()
   }

   getFieldValue(field: string) {
      return this.getProperty(`values.${field}`)
   }

   getInitialStateValues() {
      return this.initialState
   }

   setFieldError(field: string, error: string) {
      this.setFieldValue(`errors.${field}`, error)
   }

   setFieldTouched(field: string, touched: boolean) {
      this.setFieldValue(`touched.${field}`, touched)
   }

   setFieldPristine(field: string) {
      this.setFieldValue(`pristine.${field}`, true)
   }
}
