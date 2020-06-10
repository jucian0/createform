import React, { useEffect } from 'react';
import * as yup from 'yup'
import { useForm } from 'react-data-forms';
import ReactJson from 'react-json-view'


const validation: any = yup.object().shape({
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
         number: 0
      }
   ],
   options: "value 1",
   radio: "op3",
   accept: true
}

const newValues = {
   name: "Juciano",
   email: "juciano@juciano.com",
   address: [
      {
         street: "",
         number: 0
      }
   ],
   options: "value 1",
   radio: "op3",
   accept: true
}

const Debounced: React.FC = () => {

   const [{ values, reset, resetField, errors, touched, setFields, setField }, { input }] = useForm({ initialValues, validation })



   return (
      <div className="row">
         <div className="col-lg-12">
            <button type="button" className="btn btn-primary" onClick={() => resetField("address.0.number")}>Reset number</button>
            <button type="button" className="btn btn-primary" onClick={() => reset()}>Reset All</button>
            <button type="button" className="btn btn-primary" onClick={() => setFields(newValues)}>Set All values</button>
            <button type="button" className="btn btn-primary" onClick={() => setField("name", "Juciano")}>setField name</button>
         </div>
         <div className="col-lg-4">
            <h2>Debounce Form</h2>
            <div className="form-group">
               <label>Nome</label>
               <input className="form-control" {...input('name', 'text')} />
               <span className="text-danger">{touched.name && errors.name}</span>
            </div>
            <div className="form-group">
               <label>E-mail</label>
               <input className="form-control" {...input("email", "email")} />
               <span className="text-danger">{touched.email && errors.email}</span>
            </div>
            <div className="form-group">
               <label>Bio</label>
               <textarea className="form-control" {...input("bio")} />
            </div>

            <div>
               <h3>Address</h3>
               <div className="form-group">
                  <label>Street</label>
                  <input className="form-control" {...input({ name: "address.0.street", type: "text" })} />
                  <span className="text-danger">{touched.address?.[0].street && errors.address?.[0].street}</span>
               </div>
               <div className="form-group">
                  <label>Number</label>
                  <input className="form-control" {...input("address.0.number", "number")} />
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
                  <input className="form-control" {...input("accept", "checkbox")} />
               </div>
            </div>
         </div>

         <div className="col-lg-4">
            <h2>Form Values</h2>
            <ReactJson src={values} theme="solarized" />
         </div>
         <div className="col-lg-4">
            <h2>Form Errors</h2>
            <ReactJson src={errors} theme="solarized" />
         </div>

      </div>
   );
}

export default Debounced;
