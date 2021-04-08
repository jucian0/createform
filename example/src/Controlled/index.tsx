import * as React from 'react';
import * as yup from 'yup'
import { useForm } from '../../../src';


const validationSchema: any = yup.object().shape({
   name: yup.string().required("this field is required"),
   email: yup.string().required("this field is required").email("this field must be a valid email"),
   address: yup.array(yup.object().shape({
      street: yup.string().required("this field is required"),
      number: yup.number().required('this field is required')
   }))
});

const options = [
   { value: 'chocolate', label: 'Chocolate', },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
]

const initialValues = {
   name: "Jesse Woodson James",
   email: "jesse@jesse.com",
   address: [
      {
         street: "",
         number: 70,
         john: [
            {
               name: 'john'
            }
         ]
      }
   ],
   options: "value 1",
   radio: "op3",
   accept: true
}

const Controlled: React.FC = () => {

   const { state, register, resetForm, resetFieldValue, setFieldsTouched } = useForm({ initialValues, validationSchema })

   console.log('<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>>>')

   setFieldsTouched(state => ({
      ...state,
      name: true,
      address: [
         {
            street: false,
            number: true,
            john: [
               {
                  name: true
               }
            ]
         }
      ]
   }
   ))

   return (
      <div className="row">
         <div className="col-lg-12">
            <h2>Controlled Form</h2>
            <div className="form-group">
               <label>Nome</label>
               <input className="form-control" autoComplete="off" {...register('name')} />
               <span className="text-danger">{state.touched.name && state.errors.name}</span>
            </div>
            <div className="form-group">
               <label>E-mail</label>
               <input className="form-control" autoComplete="off" {...register("email")} />
               <span className="text-danger">{state.touched.email && state.errors.email}</span>
            </div>
            <div className="form-group">
               <label>Bio</label>
               <textarea className="form-control" autoComplete="off" {...register("bio")} />
            </div>

            <div>
               <h3>Address</h3>
               <div className="form-group">
                  <label>Street</label>
                  <input className="form-control" autoComplete="off" {...register("address.0.street")} />
                  <span className="text-danger">{state.touched.address?.[0].street && state.errors.address?.[0].street}</span>
               </div>
               <div className="form-group">
                  <label>Number</label>
                  <input className="form-control" autoComplete="off" {...register("address.0.number")} />
                  <span className="text-danger">{state.touched.address?.[0].number && state.errors.address?.[0].number}</span>
               </div>
            </div>
            <div className="col-lg-12">
               <div className="form-group">
                  <label>Select Option</label>
                  <select {...register("options")}>
                     <option value="value 1">Option 1</option>
                     <option value="value 2">Option 2</option>
                     <option value="value 3">Option 3</option>
                     <option value="value 4">Option 4</option>
                  </select>
               </div>
               <div className="form-group">
                  <label htmlFor="accept">Accept</label>
                  <input className="form-control" autoComplete="off" {...register("accept")} type="checkbox" />
               </div>
            </div>
         </div>

         <div className="col-lg-6">
            <button type="button" className="btn btn-primary" onClick={() => resetFieldValue("address.0.number")}>Reset number</button>
            <button type="button" className="btn btn-primary" onClick={() => resetFieldValue("address.0.john.0.name")}>Reset number</button>

         </div>
         <div className="col-lg-6">
            <button type="button" className="btn btn-primary" onClick={() => resetForm()}>Reset All</button>
         </div>
      </div>
   );
}

export default Controlled;
