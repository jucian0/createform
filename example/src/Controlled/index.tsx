import * as React from 'react'
import { create } from '../../../src/Create'

const useForm2 = create({
   name: [
      '',
      required("It's required"),
      minLength(3, 'Min length is 3'),
      maxLength(10, 'Max length is 10')
   ],
   age: [
      '',
      required("It's required"),
      min(18, 'Min age is 18'),
      max(100, 'Max age is 100')
   ],
   email: [
      '',
      required("It's required"),
      email('Email is not valid'),
      maxLength(100, 'Max length is 100')
   ],
   password: [
      '',
      required("It's required"),
      minLength(8, 'Min length is 8'),
      maxLength(20, 'Max length is 20')
   ]
})

const useForm = create(builder => {
   return {
      name: builder.text().builder('juciano'),
      lastName: builder.text().validations(['res', 're']).builder('barbosa'),
      select: builder.select().builder(2),
      range: builder.range().builder(1),
      checkbox: builder.checkbox().builder(true),
      radio: builder.radio().builder('1'),
      nested: {
         street: builder.text().builder('Virginio Belgini'),
         number: builder.number().builder(123),
         city: builder.text().builder('São Paulo'),
         range: [
            builder.number().builder(1),
            builder.number().builder(10),
            builder.number().builder(100)
         ]
      }
   }
})

const Controlled: React.FC = () => {
   const { register, state } = useForm()

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
                  placeholder="Last name"
                  className="form-control"
                  {...register('lastName')}
               />
            </div>

            <div className="form-group">
               <input
                  placeholder="Range 3th position"
                  className="form-control"
                  {...register('nested.range.0')}
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
                  type="checkbox"
                  className="form-control"
                  {...register('checkbox')}
               />
            </div>

            <div className="form-group" {...register('radio')}>
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
