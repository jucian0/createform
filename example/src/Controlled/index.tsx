import * as React from 'react'
import { create } from '../../../src/Create'

const useForm = create(builder => {
   return {
      name: builder.text().builder('juciano'),
      lastName: builder.text().builder('barbosa'),
      select: builder.select().builder('1'),
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
               <input type="radio" value="1" />
               <input type="radio" value="2" />
               <input type="radio" value="3" />
               <input type="radio" value="4" />
               <input type="radio" value="5" />
               <input type="radio" value="6" />
            </div>
         </div>
      </div>
   )
}

export default Controlled
