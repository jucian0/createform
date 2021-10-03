import * as React from 'react'
import { create } from '../../../src/Create'

const useForm = create(builder => {
   return {
      name: builder.text('name').builder('juciano'),
      lastName: builder.text('lastName').builder('barbosa')
   }
})

const Controlled: React.FC = () => {
   const { refs, state } = useForm()

   React.useEffect(() => {
      console.log(state)
   }, [refs])

   return (
      <div className="row">
         <div className="col-lg-12">
            <h2>Controlled Form</h2>
            <div className="form-group">
               <input
                  placeholder="Name"
                  className="form-control"
                  {...refs.name}
               />
            </div>
            <div className="form-group">
               <input
                  placeholder="Last name"
                  className="form-control"
                  {...refs.lastName}
               />
            </div>
         </div>
      </div>
   )
}

export default Controlled
