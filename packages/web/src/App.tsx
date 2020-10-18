import React, { useEffect } from 'react'
import * as yup from 'yup'
import './styles.css'
import { FormContext, useContextForm, useFormTest } from '@forms/useform'

type Form = {
  name: string,
  email: string,
  password: string,
  date: Date,
  other: {
    test: string
  }
}

const initialValues = {
  name: 'Joseph',
  email: '',
  password: '',
  date: new Date(),
  score: 2,
  other: {
    test: 'juciano'
  }
}

function Form2() {

  const { register, state } = useContextForm<typeof initialValues>()

  return (
    <>
      <div>
        <input placeholder="Last Name" {...register('lastName')} />
        <span className="error">{state.touched?.name && state.errors?.name}</span>
      </div>
    </>
  )
}




const schemaValidation = yup.object().shape({
  name: yup.string().required("this field is required"),
  email: yup.string().required("this field is required").email("this field must be a valid email"),
  password: yup.string().required('this field is required'),
  date: yup.date(),
  other: yup.object().shape({
    test: yup.string()
  })
});

const App: React.FC = () => {

  const { register, state, resetForm, setForm, setFieldsTouched, resetFieldsTouched, onSubmit, setFieldsValue, ...form } = useFormTest<Form>({
    initialValues,
    schemaValidation,
    isControlled: true,
    //debounced: 500
  })



  function handleSetForm() {
    setForm(state => ({
      ...state,
      values: {
        ...state.values,
        name: 'Juciano',
        email: 'jose@jose.com'
      }
    }))
  }


  function handlesetFieldsTouched() {
    setFieldsTouched(state => ({ ...state, name: false, other: { test: true } }))
    form.setFieldsError(state => ({ ...state, name: 'error' }))
  }

  function handleSubmit(e: typeof initialValues, isValid) {
    console.log(e, isValid)
  }

  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <FormContext.Provider value={{ register, state, resetForm, setForm, setFieldsTouched, resetFieldsTouched, onSubmit, setFieldsValue, ...form }}>
      <section>
        <form >
          <div>
            <input placeholder="Name" {...register('name')} />
            <span className="error">{state.touched?.name && state.errors?.name}</span>
          </div>
          <div>
            <input placeholder="E-mail" {...register('email')} />
            <span className="error">{state.touched?.email && state.errors?.email}</span>
          </div>
          <div>
            <input placeholder="Password" {...register('password')} />
            <span className="error">{state.touched?.password && state.errors?.password}</span>
          </div>
          <div>
            <input placeholder="Score" type="range" {...register('score')} />
            <span className="error">{state.touched?.score && state.errors?.score}</span>
          </div>
          <div>
            <input placeholder="Date" type="date" {...register('date')} />
            <span className="error">{state.touched?.date && state.errors?.date}</span>
          </div>
          <div>
            <input placeholder="File" type="file" {...register('file')} />
            <span className="error">{state.touched?.file && state.errors?.file}</span>
          </div>
          <div>
            <button type="button" onClick={resetForm}>resetForm</button>
            <button type="button" onClick={handleSetForm}>setForm</button>
            <button type="button" onClick={handlesetFieldsTouched}>setFieldsTouched</button>
            <button type="button" onClick={resetFieldsTouched}>resetFieldsTouched</button>
            <button type="button" onClick={onSubmit(handleSubmit)}>submit</button>
          </div>
          <Form2 />
        </form>
      </section>
    </FormContext.Provider>
  )
}

export default App