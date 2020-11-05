import * as React from 'react'
import { render } from '@testing-library/react';
import { useForm } from '../../src/index'
// import DatePicker from "react-datepicker";

export function setup({ hookParams, inputParams, onSubmit }: any) {
   const returnVal: any = {}

   function InputComponent() {

      const {state, register,setFieldValue,...rest} = useForm<any>(hookParams)


      setFieldValue('test-name','jose')

      Object.assign(returnVal, { state, ...rest })
      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.resetForm}>
            <input {...register(inputParams.name)} type={inputParams.type} data-testid={inputParams.name} />
            <button type="submit" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }
   render(<InputComponent />)

   return Object.assign(returnVal, { input: inputParams.name })
}

// export function customSetup({ hookParams, inputParams, onSubmit }: any) {
//    const returnVal: any = {}

//    function InputComponent() {

//       const {state:{values}, ...rest} = useForm(hookParams)

//       Object.assign(returnVal, { values, ...rest })
//       return (
//          <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.resetForm} role="form">
//             <DatePicker {...custom(inputParams.name)} data-testid={inputParams.name} />
//             <input {...input("supporting", "text")} role="text" data-testid="supporting" />
//             <button type="submit" data-testid="on-submit"></button>
//             <button type="reset" data-testid="on-reset"></button>
//          </form>
//       )
//    }
//    render(<InputComponent />)

//    return Object.assign(returnVal, { input: inputParams.name })
// }