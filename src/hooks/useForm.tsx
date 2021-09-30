type Observer<T> = (...args: any[]) => void
type Observers<T> = Set<Observer<T>>

interface Observable<T> {
   set: (state: T) => void
   patchState: (state: T) => void
   subscribe: (observer: Observer<T>) => void
   get: () => T
}

class ObservableForm<T> implements Observable<T> {
   private observers: Observers<T>

   constructor(private state: T) {
      this.observers = new Set()
   }

   set(state: T) {
      this.state = state
   }

   patchState(state: Partial<T>) {
      this.state = Object.assign(this.state, state)
   }

   subscribe(observer: Observer<T>) {
      this.observers.add(observer)

      return () => {
         this.observers.delete(observer)
      }
   }

   get() {
      return this.state
   }

   notify() {
      this.observers.forEach(observer => observer(this.state))
   }
}

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
