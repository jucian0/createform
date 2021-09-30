class FormBuilder {
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

const useForm = createForm((builder: any) => ({
   fields: {
      name: builder.text('Name').required().validations(['required']).build(''),
      email: builder
         .email('Email')
         .required()
         .validations(['required'])
         .build(''),
      password: builder
         .password('Password')
         .required()
         .validations(['required'])
         .build(''),
      lastOne: {
         path: builder
            .text('LastOne')
            .required()
            .validations(['required'])
            .build('')
      }
   }
}))

function ExampleForm() {
   const form = useForm({ onSubmit, onReset })

   function onSubmit(values: any) {
      console.log(values)
   }

   function onReset() {}

   return (
      <div>
         <h1>Form</h1>
         <form onSubmit={form.onSubmit} onReset={form.onReset}>
            <label>Name</label>
            <input {...form.name} />
            <label>Email</label>
            <input {...form.email} />
            <label>Password</label>
            <input {...form.password} />
            <button type="submit">Submit</button>
         </form>
      </div>
   )
}
