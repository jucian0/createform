import React, { useEffect } from 'react'
import './styles.css'
import { create, useForm } from '@forms/useform'

const form = create({
  initialValues: {
    name: 'juciano',
    email: 'jose',
    password: '123456',
    other: {
      ice: -12
    }
  }
})

const App: React.FC = () => {


  const [values, { input, onSubmit, reset }] = useForm(form,
    {
      isControlled: true,
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
          <input placeholder="password" {...input('password', 'text')} />
        </div>
        <div>
          <button type="submit">reset</button>
          <button type="reset">submit</button>
        </div>
      </form>
    </section>
  )
}

export default App
