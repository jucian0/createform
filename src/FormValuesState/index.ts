export class FormValuesState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFormValue(values: T) {
      this.set(values)
      this.notify()
   }

   setFieldValue(field: string, value: any) {
      this.patchState({ [field]: value } as Partial<T>)
      this.notify()
   }

   resetFormValues() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldValue(field: string) {
      this.patchState({ [field]: this.initialState[field] } as Partial<T>)
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
