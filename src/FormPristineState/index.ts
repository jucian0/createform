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

   setFieldPristine(field: string, value: string) {
      this.patchState({ [field]: value } as any)
      this.notify()
   }

   resetFieldsPristine() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldPristine(field: string) {
      this.patchState({ [field]: this.initialState[field] } as Partial<T>)
      this.notify()
   }

   getFieldsPristine() {
      return this.get()
   }

   getFieldPristine(field: string) {
      return this.get()[field]
   }
}
