import React, { useEffect } from 'react'
import * as yup from 'yup'
import './styles.css'
import { useForm, create } from '@forms/useform'
import Select from 'react-select'

const options = [
  { value: 'chocolate', label: 'Chocolate', },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]


const schemaValidation = yup.object().shape({
  name: yup.string().required("this field is required"),
  email: yup.string().required("this field is required").email("this field must be a valid email"),
});


const form = create({
  initialValues: {
    name: '',
    email: ''
  },
  schemaValidation
})


//const test = create()

const App: React.FC = () => {

  const [state, { input, onSubmit, reset, setValues, setTouched, setErrors }] = useForm(form,
    {
      watch: e => {
        // console.log(e, '<<<<<<<<< watch')
      },
      //isControlled: true,
      //debounce: 500
    })

  React.useEffect(() => {
    console.log(state.values)
  }, [state])


  React.useEffect(() => {
    setTimeout(() => {
      // setValues({
      //   name: 'jose antonio',
      //   // email: 'jose@olimpio.com'
      // })

      // setTouched({
      //   name: true
      // })

      // setErrors({
      //   name: 'Invalid'
      // })
    }, 3000)
  }, [])


  return (
    <section>
      <form onSubmit={onSubmit(e => {
        console.log(e, '<<<<<<<<<< submit')
      })} onReset={reset}>
        <div>
          <input placeholder="name" {...input('name', 'text')} />
          <span className="error">{state.touched.name && state.errors.name}</span>
        </div>
        <div>
          <input placeholder="email" {...input('email', 'email')} />
          <span className="error">{state.touched.email && state.errors.email}</span>
        </div>
        <div>
          <input placeholder="password" {...input('passwords.test', 'password')} />
        </div>
        <div>
          <input placeholder="password" {...input('password', 'password')} />
        </div>
        <div>
          <Select
            {...input("iceCream")}
            options={options}
          />
        </div>
        <div>
          <button type="reset">reset</button>
          <button type="submit">submit</button>
        </div>
      </form>
    </section>
  )
}

export default App
