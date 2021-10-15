import * as React from 'react'
import { create } from '../../../src/V3/React/CreateForm'
import {
   email,
   max,
   maxLength,
   min,
   minLength,
   number,
   required
} from '../../../src/V3/Validation/Validators'

const useForm = create(build => ({
   name: build([
      '',
      required("It's required"),
      minLength(3, 'Min length is 3'),
      maxLength(10, 'Max length is 10')
   ]),
   email: build(['', required("It's required"), email('Email is invalid')]),
   number: build([
      '',
      required("It's required"),
      number('Number is invalid'),
      max(10, 'Max is 10'),
      min(0, 'Min is 0')
   ]),
   range: build([
      '',
      required("It's required"),
      number('Number is invalid'),
      max(10, 'Max is 10'),
      min(0, 'Min is 0')
   ]),
   select: build([
      '',
      required("It's required"),
      maxLength(10, 'Max length is 10')
   ]),
   checkbox: build([true]),
   radio: build([1])
}))

const Controlled: React.FC = () => {
   const { register, state, form$ } = useForm({
      mode: 'onChange'
   })

   //console.log(state.values)

   //form$.subscribe(e => console.log(e.values))

   return (
      <div className="row">
         <div className="col-lg-12">
            <h2>Controlled Form</h2>
            <div className="form-group">
               <input
                  placeholder="Name"
                  className="form-control"
                  {...register('name')}
               />
            </div>
            <div className="form-group">
               <input
                  placeholder="Last email"
                  className="form-control"
                  {...register('email')}
               />
            </div>

            <div className="form-group">
               <input
                  placeholder="Range 3th position"
                  className="form-control"
                  {...register('number')}
               />
            </div>
            <div className="form-group">
               <select className="form-control" {...register('select')}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
               </select>
            </div>
            <div className="form-group">
               <input
                  type="range"
                  className="form-control"
                  {...register('range')}
               />
            </div>
            <div className="form-group">
               <label htmlFor="">Checkbox</label>
               <input
                  className="form-control"
                  {...register('checkbox', 'checkbox')}
               />
            </div>

            <div className="form-group" {...register('radio', 'radio')}>
               <div className="form-check">
                  <input
                     className="form-check-input"
                     id="1"
                     type="radio"
                     value="1"
                     name="radio"
                  />
                  <label className="form-check-label" htmlFor="1">
                     Option 1
                  </label>
               </div>
               <div className="form-check">
                  <input
                     className="form-check-input"
                     id="2"
                     type="radio"
                     value="2"
                     name="radio"
                  />
                  <label className="form-check-label" htmlFor="1">
                     Option 2
                  </label>
               </div>
               <div className="form-check">
                  <input
                     className="form-check-input"
                     id="3"
                     type="radio"
                     value="3"
                     name="radio"
                  />
                  <label className="form-check-label" htmlFor="3">
                     Option 3
                  </label>
               </div>
            </div>
         </div>
      </div>
   )
}

export default Controlled
