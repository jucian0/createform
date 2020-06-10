import React, { useEffect } from 'react';
import * as yup from 'yup'
import ReactJson from 'react-json-view'
import { useForm } from 'react-data-forms';


const validation: any = yup.object().shape({
   name: yup.string().required("this field is required"),
   email: yup.string().required("this field is required").email("this field must be a valid email"),
   address: yup.array(yup.object().shape({
      street: yup.string().required("this field is required"),
      number: yup.number().required('this field is required')
   }))
});

const initialValues = {
   name: "Jesse Woodson James",
   email: "jesse@jesse.com",
   address: [
      {
         street: "",
         number: 50
      }
   ],
   options: "value 1",
   radio: "op3",
   accept: true,
}

const Uncontrolled: React.FC = () => {

   const [{ values, reset, errors, touched, onSubmit }, { input }] = useForm({ initialValues, validation })

   const submitForm = (values: any) => {
      console.log(values)
   }

   return (
      <form onSubmit={onSubmit(submitForm)}>
         <div className="row">
            <div className="col-lg-6">
               <h2>Uncontrolled Form</h2>
               <div className="form-group">
                  <label>Nome</label>
                  <input className="form-control" autoComplete="off" {...input('name', 'text')} />
                  <span className="text-danger">{touched.name && errors.name}</span>
               </div>
               <div className="form-group">
                  <label>E-mail</label>
                  <input className="form-control" autoComplete="off" {...input("email", "email")} />
                  <span className="text-danger">{touched.email && errors.email}</span>
               </div>
               <div className="form-group">
                  <label>Bio</label>
                  <textarea className="form-control" autoComplete="off" {...input("bio")} />
               </div>

               <div>
                  <h3>Address</h3>
                  <div className="form-group">
                     <label>Street</label>
                     <input className="form-control" autoComplete="off" {...input({ name: "address.0.street", type: "text" })} />
                     <span className="text-danger">{touched.address?.[0].street && errors.address?.[0].street}</span>
                  </div>
                  <div className="form-group">
                     <label>Number</label>
                     <input className="form-control" autoComplete="off" {...input("address.0.number", "number")} />
                     <span className="text-danger">{touched.address?.[0].number && errors.address?.[0].number}</span>
                  </div>
               </div>
               <div className="col-lg-3">
                  <div className="form-group">
                     <label>Select Option</label>
                     <select {...input("options")}>
                        <option value="value 1">Option 1</option>
                        <option value="value 2">Option 2</option>
                        <option value="value 3">Option 3</option>
                        <option value="value 4">Option 4</option>
                     </select>
                  </div>
                  <div className="form-group">
                     <label htmlFor="accept">Accept</label>
                     <input className="form-control" autoComplete="off" {...input("accept", "checkbox")} />
                  </div>
               </div>
            </div>

            <div className="col-lg-6">
               <h2>Form Values</h2>
               <ReactJson src={values} theme="solarized" />
            </div>
            <div className="col-lg-3">
               <button type="button" className="btn btn-primary" onClick={() => reset()}>Reset All</button>
            </div>

            <div className="col-lg-3">
               <button type="submit" className="btn btn-primary">Submit</button>
            </div>
         </div>
      </form>
   );
}

export default Uncontrolled;
