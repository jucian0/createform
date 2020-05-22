import {useForm} from 'react-data-forms'
import { CopyBlock, dracula } from 'react-code-blocks'
import dynamic from 'next/dynamic';

const ReactJson=dynamic(import ('react-json-view'),{ssr:false});

const initialValues = {
   name:"Jesse",
   email:"jesse@jesse.com",
   pets:["felix"],
   score:22
}

export default function DebouncedForm(){

   const [{values, reset, onSubmit},{input}] = useForm({initialValues, debounce:500})
   const codeBlock = `
      import {useForm} from 'react-data-forms'

      const initialValues = {
         name:"Jesse",
         email:"jesse@jesse.com",
         pets:["felix"]
      }

      function ControlledForm(){

         const [{values, reset},{input}] = useForm({initialValues, debounce:500})
         return (
            <>
               <input {...input("email", "email")}/>
               <input {...input("password" ,"password")}/>            
               <input {...input("pets.0" ,"text")}/>         
               <input {...input("score", "range")}/>
            <>   
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
                  <h2 className="text-align-center">Debounce Forms</h2>
            </div>
         </div>
         <div class="col-md-6 m-t-50 p-4">
            <form style={{border:"1px solid #333", borderRadius:3, padding:10}}>
               <div class="form-group">
                  <label>Email address</label>
                  <input {...input("email", "email")} class="form-control"/>
               </div>
               <div class="form-group">
                  <label>Name</label>
                  <input {...input("name" ,"text")} class="form-control"/>
               </div>
               <div class="form-group">
                  <label>Pets</label>
                  <input {...input(`pets.0` ,"text")} class="form-control"/>
               </div>
               <div class="form-group">
                  <label>Range</label>
                  <input {...input("score", "range")} class="form-control-range"/>
               </div>
               <div className="d-flex justify-content-between">
               <button type="button" class="btn btn-primary" onClick={reset}>Reset Form</button>
               <button type="button" class="btn btn-primary">Submit</button>
               </div>
            </form>
         </div>
         <div class="col-md-6 m-t-50 p-4">
            <ReactJson src={values} theme="colors" style={{borderRadius:3,height:'100%', padding:10}}/>
         </div>
    </div>

   )
}