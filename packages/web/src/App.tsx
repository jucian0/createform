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


  const [values, { register }] = useForm(form,
    {
      isControlled: true
    })

  console.log(values)

  return (
    <section>
      <form>
        <div>
          <input placeholder="name" {...register('name', 'text')} />
        </div>
        <div>
          <input placeholder="email" {...register('email', 'email')} />
        </div>
        <div>
          <input placeholder="password" {...register('password', 'text')} />
        </div>
        <div>
          <button>reset</button>
          <button>submit</button>
        </div>
      </form>
    </section>
  )
}

export default App
