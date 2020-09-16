import React, { useEffect } from 'react'
import './styles.css'
import { create, useForm } from '@forms/useform'

const form = create({
  initialValues: {
    name: 'juciano',
    email: 'jose@jose.com',
    password: '123456',
    other: {
      ice: -12
    }
  }
})

const App: React.FC = () => {


  const [values, { input, onSubmit, reset }] = useForm(form,
    {
      //isControlled: true,
      //debounce: 500
    })

  React.useEffect(() => {
    console.log(values)
  }, [values])


  return (
    <section>
      <form onSubmit={onSubmit(e => {
        console.log(e)
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
