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

   setFieldTouched(field: string, value: string) {
      this.patchState({ [field]: value } as any)
      this.notify()
   }

   resetFieldsTouched() {
      this.set(this.initialState)
      this.notify()
   }

   resetFieldTouched(field: string) {
      this.patchState({ [field]: this.initialState[field] } as Partial<T>)
      this.notify()
   }

   getFieldsTouched() {
      return this.get()
   }

   getFieldTouched(field: string) {
      return this.get()[field]
   }

   getInitialToucheds() {
      return this.initialState
   }
}
