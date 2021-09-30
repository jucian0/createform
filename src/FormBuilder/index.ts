export class FormBuilder {
   private state: FormState<any>

   constructor(initialState: any) {
      this.state = new FormState(initialState, onSubmit, onReset)
   }

   name(value: string) {
      return this.state.setField('name', value)
   }

   email(value: string) {
      return this.state.setField('email', value)
   }

   password(value: string) {
      return this.state.setField('password', value)
   }

   onSubmit(onSubmitCallback: (state: any) => void) {
      return this.state.onSubmit(onSubmitCallback)
   }

   onReset(onResetCallback: () => void) {
      return this.state.onReset(onResetCallback)
   }

   getInitialState() {
      return this.state.getInitialState()
   }
}
