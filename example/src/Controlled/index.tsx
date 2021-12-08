import React, { useEffect } from 'react'
import { useForm } from '../../../src/hooks/useForm'
import { useFormContext } from '../../../src/hooks/useContextForm'
import { FormContextProvider } from '../../../src/core/contextForm'
import Select from 'react-select'

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

const Controlled: React.FC = () => {
   const { state, register, setFieldsValue, onSubmit, ...form } = useForm({
      initialValues: {
         name: 'juciano',
         email: 'juciano@juciano.com'
         // password: '123456',
      }
   })

   console.log(state)

   return (
      <FormContextProvider
         value={{
            state,
            register,
            onSubmit,
            ...form
         }}
      >
         <form
            noValidate
            onSubmit={onSubmit(e => {
               console.log(e)
            })}
         >
            <div className="row">
               <div className="col-lg-12">
                  <div className="form-group">
                     <label>Name</label>
                     <input
                        className="form-control"
                        autoComplete="off"
                        {...register('name')}
                     />
                  </div>
               </div>
               <div className="col-lg-12">
                  <div className="form-group">
                     <label>E-mail</label>
                     <input
                        className="form-control"
                        type="email"
                        autoComplete="off"
                        {...register('email')}
                     />
                  </div>
               </div>
               <InnerForm />
               <div className="col-lg-12">
                  <div className="form-group">
                     <label>password</label>
                     <input
                        className="form-control"
                        autoComplete="off"
                        type="password"
                        {...register('password')}
                     />
                  </div>
               </div>
               <button type={'submit'}>Submit</button>
            </div>
         </form>
      </FormContextProvider>
   )
}

function InnerForm() {
   const { register, setFieldValue, state, setFieldTouched } = useFormContext()

   // console.log(form.state.values)

   return (
      <div className="row">
         <div className="col-lg-12">
            <div className="form-group">
               <label>context</label>
               <input
                  className="form-control"
                  autoComplete="off"
                  {...register('context')}
               />
            </div>
         </div>
         <div className="col-lg-12">
            <div className="form-group">
               <label> Select</label>
               <Select
                  options={options}
                  value={state.values.select}
                  onBlur={() => setFieldTouched('select', true)}
                  onChange={e => {
                     setFieldValue('select', e)
                  }}
               />
            </div>
         </div>
         <button
            type={'button'}
            onClick={() => setFieldValue('name', 'juciano c barbosa')}
         >
            Change
         </button>
      </div>
   )
}

export default Controlled
