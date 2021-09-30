const useForm = createForm((builder: any) => ({
   fields: {
      name: builder.text('Name').validations(['required']).build(''),
      email: builder.email('Email').validations(['required']).build(''),
      password: builder
         .password('Password')
         .validations(['required'])
         .build(''),
      lastOne: {
         path: builder.text('LastOne').validations(['required']).build('')
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
