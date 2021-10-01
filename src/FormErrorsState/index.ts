export class FormErrorsState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T) {
      super(defaultState)
      this.initialState = defaultState
   }

   setFieldsError(values: T) {
      this.set(values)
      this.notify()
   }

   setFieldError(field: string, value: string) {
      this.patchState({ [field]: value } as any)
      this.notify()
   }

   resetFieldsError() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldError(field: string) {
      this.patchState({ [field]: this.initialState[field] } as Partial<T>)
      this.notify()
   }

   getFieldsError() {
      return this.get()
   }

   getFieldError(field: string) {
      return this.get()[field]
   }

   getInitialErrors() {
      return this.initialState
   }
}
