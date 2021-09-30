/**
 *  FormState is a class that holds the state of a form.
 * It is used to keep track of the state of the form and to provide a way to manipulate the form.
 */
export class FormState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(
      state: T,
      private onSubmitCallback: (state: T) => void,
      private onResetCallback: () => void
   ) {
      super(state)
      this.initialState = state
   }

   setFields(values: T) {
      this.set(values)
      this.notify()
   }

   setField(field: string, value: any) {
      this.patchState({ [field]: value } as Partial<T>)
      this.notify()
   }

   resetFields() {
      this.set(this.initialState)
      this.notify()
   }

   resetField(field: string) {
      this.patchState({ [field]: this.initialState[field] } as Partial<T>)
      this.notify()
   }

   getFields() {
      return this.get()
   }

   getField(field: string) {
      return this.get()[field]
   }

   onSubmit() {
      return this.onSubmitCallback(this.get())
   }

   onReset() {
      this.onResetCallback()
   }

   getInitialState() {
      return this.initialState
   }
}
