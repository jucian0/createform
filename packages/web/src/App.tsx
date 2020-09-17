import React, { useEffect } from 'react'
import './styles.css'
import { create, useForm } from '@forms/useform'

const form = create({
  initialValues: {
    name: 12,
    email: 'jose@jose.com',
    password: '123456',
    other: {
      ice: -12,
      more: {
        less: '1212'
      }
    }
  },
  initialErrors: {
    name: 'Not Valid',
    email: 'Not Valid',
    password: 'Not Valid',
    other: {
      ice: 'Not Valid'
    }
  }
})

const App: React.FC = () => {


  const [values, { input, onSubmit, reset, set }] = useForm(form,
    {
      watch: e => {
        // console.log(e, '<<<<<<<<< watch')
      },
      // isControlled: true,
      //debounce: 500
    })

  React.useEffect(() => {
    console.log(values)
  }, [values])


  React.useEffect(() => {
    setTimeout(() => {
      set({
        name: 'jose antonio',
        email: 'jose@olimpio.com'
      })
    }, 3000)
  }, [])


  return (
    <section>
      <form onSubmit={onSubmit(e => {
        console.log(e, 'submit')
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
