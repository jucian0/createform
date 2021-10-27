import { TextField } from '@material-ui/core'
import * as React from 'react'
import { useForm } from '../../../src/hooks/hook'
import Select from 'react-select'
import * as yup from 'yup'

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

const Controlled: React.FC = () => {
   const { register, state, setFieldValue, resetFieldValue } = useForm({
      mode: 'onChange',
      validationSchema: yup.object().shape({
         email: yup.string().email().required(),
         name: yup.string().required(),
         nested: yup.object().shape({
            option: yup.string().email()
         })
      })
   })

   console.log(state)

   //setFieldsValue(state => ({ ...state }))

   return (
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
            <div className="form-group">
               <label>E-mail</label>
               <input
                  className="form-control"
                  autoComplete="off"
                  {...register('email')}
               />
            </div>
            <div className="form-group">
               <label>Select Option</label>
               <select {...register('nested.options')}>
                  <option value="value 1">Option 1</option>
                  <option value="value 2">Option 2</option>
                  <option value="value 3">Option 3</option>
                  <option value="value 4">Option 4</option>
               </select>
            </div>
         </div>

         <div className="form-group" {...register('radio')}>
            <label>Radio</label>
            <div className="form-check">
               <input
                  className="form-check-input"
                  type="radio"
                  name="radio1"
                  value="option1"
               />
               <label className="form-check-label" htmlFor="radio1">
                  Option 1
               </label>
            </div>
            <div className="form-check">
               <input
                  className="form-check-input"
                  type="radio"
                  name="radio1"
                  value="option2"
               />
               <label className="form-check-label" htmlFor="radio2">
                  Option 2
               </label>
            </div>
         </div>
         <div className="form-group">
            <label>Checkbox</label>
            <div className="form-check">
               <input
                  className="form-check-input"
                  type="checkbox"
                  {...register('checkbox')}
               />
               <label className="form-check-label" htmlFor="checkbox">
                  Checkbox
               </label>
            </div>
         </div>
         <div className="col-lg-12">
            <div className="form-group">
               <label>Select</label>
               <div {...register('select')}>
                  <Select
                     options={options}
                     onChange={e => setFieldValue('select', e?.value)}
                  />
               </div>
            </div>
         </div>

         <button onClick={() => setFieldValue('email', 'juciano@juciano.com')}>
            Change Field Value
         </button>

         <button onClick={() => resetFieldValue('email')}>
            Reset Field Value
         </button>
      </div>
   )
}

export default Controlled
