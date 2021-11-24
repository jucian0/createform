import { TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from '../../../src/hooks/useForm'
import Select from 'react-select'
import * as yup from 'yup'

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

const Controlled: React.FC = () => {
   const {
      register,
      state,
      setFieldValue,
      resetFieldValue,
      handleChange,
      onSubmit
   } = useForm({
      initialValues: {
         name: 'juciano'
      },
      mode: 'onBlur'
      //  validationSchema: yup.object().shape({
      //    email: yup.string().email().required(),
      //    name: yup.string().required(),
      //    nested: yup.object().shape({
      //      option: yup.string().email()
      //    })
      //  })
   })

   console.log(state.values)

   return (
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
   )
}

export default Controlled
