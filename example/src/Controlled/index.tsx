import * as React from 'react'
import { create } from '../../../src/Create'

const useForm = create(builder => {
   return {
      name: builder.text().builder('juciano'),
      lastName: builder.text('lastName').builder('barbosa'),
      address: {
         street: builder.text('street').builder('Virginio Belgini'),
         number: builder.number('number').builder(123),
         city: builder.text('city').builder('São Paulo'),
         range: [
            builder.number('0').builder(1),
            builder.number('1').builder(10),
            builder.number('2').builder(100)
         ]
      }
   }
})

const Controlled: React.FC = () => {
   const { register, state } = useForm()

   //   React.useEffect(() => {
   //     console.log(state, refs)
   //   }, [state])

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
               {/* <input
            placeholder="Range 3th position"
            className="form-control"
            {...refs.address.range[2]}
          /> */}
            </div>
         </div>
      </div>
   )
}

export default Controlled
