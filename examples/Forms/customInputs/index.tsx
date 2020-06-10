import React from 'react';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as yup from 'yup'
import { useForm } from 'react-data-forms';
import ReactJson from 'react-json-view';


const validation: any = yup.object().shape({
   name: yup.string().required("this field is required"),
   password: yup.string().required().min(6, 'password '),
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

const Controlled: React.FC = () => {

   const [{ values, reset, errors, touched }, { input, custom }] = useForm<any, any>({ validation, onChange: true })

   return (
      <div className="row">
         <div className="col-lg-6">
            <h2>Custom Inputs</h2>
            <div className="form-group">
               <label>Nome</label>
               <input className="form-control" autoComplete="off" {...input('name', 'text')} />
               <span className="text-danger">{touched.name && errors.name}</span>
            </div>
            <div className="form-group">
               <label>React Select</label>
               <Select
                  {...custom("iceCream.flavor")}
                  options={options}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
               />
            </div>
            <div className="form-group">
               <label>Native Web Date</label>
               <input className="form-control" autoComplete="off" {...input("date", "date")} />
            </div>

            <div className="form-group">
               <label>Date Picker</label>
               <DatePicker
                  selected={(values as any).year}
                  {...custom({ name: "year", type: "custom" })}
                  showTimeSelect
                  timeFormat="HH:mm"
                  timeIntervals={15}
                  timeCaption="time"
                  dateFormat="MMMM d, yyyy h:mm aa"
               />
            </div>

            <div className="form-group">
               <label>Radio Options</label>
               <div className="form-check">
                  <input className="form-check-input" {...input({ name: "radio", value: "op1", type: "radio" })} />
                  <label className="form-check-label" htmlFor="exampleRadios1" >OP1</label>
               </div>
               <div className="form-check">
                  <input className="form-check-input"
                     {...input({ name: "radio", value: "op2", type: "radio" })}
                  />
                  <label className="form-check-label" htmlFor="exampleRadios2" >OP2</label>
               </div>
               <div className="form-check disabled">
                  <input className="form-check-input" {...input({ name: "radio", value: "op3", type: "radio" })} />
                  <label className="form-check-label" htmlFor="exampleRadios3" >OP3</label>
               </div>
            </div >
         </div>

         <div className="col-lg-6">
            <h2>Form Values</h2>
            <ReactJson src={values} theme="solarized" />
         </div>

         <div className="col-lg-3">
            <button type="button" className="btn btn-primary" onClick={() => reset()}>Reset All</button>
         </div>
      </div>
   );
}

export default Controlled;
