import React, { useEffect } from 'react'
import * as yup from 'yup'
import './styles.css'
import { useForm, create } from '@forms/useform'


const schemaValidation = yup.object().shape({
  email: yup.string().email().required(),
  name: yup.string().required()
})



const form = create({
  initialValues: {
    name: ''
  },
  initialErrors: {

  }
})


const test = create()

const App: React.FC = () => {

  const [state, { input, onSubmit, reset, setValues, setTouched, setErrors }] = useForm(form,
    {
      watch: e => {
        console.log(e, '<<<<<<<<< watch')
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
        </div>
        <div>
          <input placeholder="email" {...input('email', 'email')} />
        </div>
        <div>
          <input placeholder="password" {...input('passwords.test', 'password')} />
        </div>
        <div>
          <input placeholder="password" {...input('password', 'password')} />
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
