import { TextField } from '@material-ui/core'
import * as React from 'react'
import { useForm } from '../../../src/hooks/hook'

const Controlled: React.FC = () => {
   const { register, state$ } = useForm()

   state$.subscribe(e => console.log(e))

   return (
      <div className="row">
         <div className="col-lg-12">
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
      </div>
   )
}

export default Controlled
