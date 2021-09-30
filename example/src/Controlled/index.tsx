import { TextField } from '@material-ui/core'
import * as React from 'react'
import * as yup from 'yup'
import { useForm } from '../../../src'
import Select from 'react-select'

const optionsSelect = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

const initialValues = {
   name: 'Jesse Woodson James',
   email: 'jesse@jesse.com',
   address: [
      {
         street: '',
         number: 70,
         john: [
            {
               name: 'john'
            }
         ]
      }
   ],
   options: 'value 1',
   radio: 'op3',
   accept: true,
   select: ''
}

const Controlled: React.FC = () => {
   const {
      state,
      register,
      resetForm,
      resetFieldValue,
      setFieldsTouched,
      setFieldValue
   } = useForm({
      initialValues
   })

   return (
      <div className="row">
         <div className="col-lg-12">
            <h2>Controlled Form</h2>
            <div className="form-group">
               <TextField
                  label="Text"
                  className="form-control"
                  inputProps={register('name')}
                  name="name"
               />
               <span className="text-danger">
                  {state.touched.name && state.errors.name}
               </span>
            </div>
            <div className="form-group">
               <label>E-mail</label>
               <input
                  className="form-control"
                  autoComplete="off"
                  value={state.values.email}
                  onChange={e => setFieldValue('email', e.target.value)}
               />
               <span className="text-danger">
                  {state.touched.email && state.errors.email}
               </span>
            </div>
            <div className="form-group">
               <label>Bio</label>
               <textarea
                  className="form-control"
                  autoComplete="off"
                  {...register('bio')}
               />
            </div>
            <div className="">
               <label>Select</label>
               <Select
                  options={optionsSelect}
                  value={optionsSelect.find(
                     o => o.value === state.values.select
                  )}
                  onChange={e => setFieldValue('select', e.value)}
               />
            </div>
         </div>
      </div>
   )
}

export default Controlled
