import {useForm} from 'react-data-forms'
import { CopyBlock, dracula } from 'react-code-blocks'
import dynamic from 'next/dynamic';
import Select from 'react-select'
import DatePicker from "react-datepicker";

const ReactJson=dynamic(import ('react-json-view'),{ssr:false});

const initialValues = {
   candies:{
      iceCream:[
         { value: 'chocolate', label: 'Chocolate' }
      ]
   },
   date: new Date("05/26/2020")
}

const options = [
   { value: 'chocolate', label: 'Chocolate' },
   { value: 'strawberry', label: 'Strawberry' },
   { value: 'vanilla', label: 'Vanilla' }
 ]

export default function CustomInputs(){

   const [{values, reset},{custom}] = useForm({onChange:true, initialValues})
   const codeBlock = `
      import {useForm} from 'react-data-forms'

      const initialValues = {
         candies:{
            iceCream:[
               { value: 'chocolate', label: 'Chocolate' }
            ]
         },
         date: new Date("05/26/2020")
      }
      
      const options = [
         { value: 'chocolate', label: 'Chocolate' },
         { value: 'strawberry', label: 'Strawberry' },
         { value: 'vanilla', label: 'Vanilla' }
       ]      

      function ControlledForm(){

         const [{values, reset},{input}] = useForm({onChange:true, initialValues})
         return (
            <>
               <Select options={options} {...custom("candies.iceCream.0")} />
               <DatePicker
                  className="form-control mw-100"
                  showPopperArrow={false}
                  selected={values.date}
                  {...custom("date")}
               /> 
            </>   
         )
      }
   `


   return (
      <div class="row">
         <div class="col-md-6 p-4">
            <div style={{borderRadius:3, border:"1px solid #333"}}>
               <CopyBlock
                  text={codeBlock}
                  language={"jsx"}
                  showLineNumbers={true}
                  theme={dracula}
                  codeBlock
               />
            </div>
         </div>
         <div class="col-md-6 p-4">
            <div style={{borderRadius:3, border:"1px solid #333", height:'100%', padding:10}}>
                  <h2 className="text-align-center">Custom Inputs</h2>
            </div>
         </div>
         <div class="col-md-6 m-t-50 p-4">
            <form style={{border:"1px solid #333", borderRadius:3, padding:10}}>
               <div class="form-group">
                  <label>iceCream</label>
                  <Select options={options} {...custom("candies.iceCream.0")} />
               </div>
               <label>Date</label>
               <div class="form-group">
                  <DatePicker
                     className="form-control mw-100"
                     showPopperArrow={false}
                     selected={values.date}
                     {...custom("date")}
                  />               
               </div>
               <div className="d-flex justify-content-between">
               <button type="button" class="btn btn-primary" onClick={reset}>Reset Form</button>
               </div>
            </form>
         </div>
         <div class="col-md-6 m-t-50 p-4">
            <ReactJson src={values} theme="colors" style={{borderRadius:3,height:'100%', padding:10}}/>
         </div>
    </div>

   )
}