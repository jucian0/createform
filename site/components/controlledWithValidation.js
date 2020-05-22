import {useForm} from 'react-data-forms'
import { CopyBlock, dracula } from 'react-code-blocks'
import dynamic from 'next/dynamic';
import * as yup from 'yup'

const ReactJson=dynamic(import ('react-json-view'),{ssr:false});

const initialValues = {
   name:"",
   email:"jesse@jesse.com",
   pets:["felix"]
}

const validation = yup.object().shape({
   name: yup.string().required("This field is required"),
   email: yup.string().email("This field must be a valid e-mail").required("This field is required"),
   pets: yup.array(yup.string().required("This field is required"))
})

export default function ControlledFormWithValidation(){

   const [{values, reset, errors, touched},{input}] = useForm({onChange:true, initialValues, validation})
   const codeBlock = `
      import {useForm} from 'react-data-forms'

      const initialValues = {
         name:"Jesse",
         email:"jesse@jesse.com",
         pets:["felix"]
      }

      function ControlledForm(){

         const [{values, reset},{input}] = useForm({onChange:true, initialValues})
         return (
            <>
               <input {...input("email", "email")}/>
               <span>{touched.email && errors.email}</span>
               <input {...input("password" ,"password")}/>   
               <span>{touched.name && errors.name}</span>         
               <input {...input("pets.0" ,"text")}/>     
               <span>{touched.pets?.[0] && errors?.[0]}</span>    
               <input {...input("accept", "checkbox")}/>
            </>   
         )
      }
   `

   return (
      <div class="row">
      <div class="col-md-6 p-4">
         <div style={{borderRadius:3, border:"1px solid #333", height:'100%', padding:10}}>
               <h2 className="text-align-center">Controlled Forms With Validation</h2>
         </div>
      </div>
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
      <div class="col-md-6 m-t-50 p-4">
         <form style={{border:"1px solid #333", borderRadius:3, padding:10}}>
            <div class="form-group">
               <label>Email address</label>
               <input {...input("email", "email")} class="form-control"/>
               <span className="text-danger">{touched.email && errors.email}</span>
            </div>
            <div class="form-group">
               <label>Name</label>
               <input {...input("name" ,"text")} class="form-control"/>
               <span className="text-danger">{touched.name && errors.name}</span>
            </div>
            <div class="form-group">
               <label>Pets</label>
               <input {...input(`pets.0` ,"text")} class="form-control"/>
               <span className="text-danger">{touched.pets?.[0] && errors.pets?.[0]}</span>
            </div>
            <div class="form-group form-check">
               <input {...input("accept", "checkbox")} class="form-check-input"/>
               <label class="form-check-label">Check me out</label>
            </div>
            <div className="d-flex justify-content-between">
            <button type="button" class="btn btn-primary" onClick={reset}>Reset Form</button>
            <button type="button" class="btn btn-primary">Submit</button>
            </div>
         </form>
      </div>
      <div class="col-md-6 m-t-50 p-4">
         <ReactJson src={values} theme="colors" style={{borderRadius:3,height:'50%', padding:10}}/>
         <ReactJson name="errors" src={errors} theme="colors" style={{borderRadius:3,height:'50%', padding:10}}/>
      </div>
    </div>
   )
}