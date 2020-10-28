import React from '../../../../src/hooks/node_modules/react'
import { render } from '@testing-library/react';
import { useForm } from '../../index'
import DatePicker from "react-datepicker";

export function setup({ hookParams, inputParams, onSubmit }: any) {
   const returnVal: any = {}

   function InputComponent() {

      const [{ values, ...rest }, { input }] = useForm(hookParams)

      Object.assign(returnVal, { values, ...rest })
      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.reset}>
            <input {...input(inputParams)} data-testid={inputParams.name} />
            <button type="submit" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }
   render(<InputComponent />)

   return Object.assign(returnVal, { input: inputParams.name })
}

export function customSetup({ hookParams, inputParams, onSubmit }: any) {
   const returnVal: any = {}

   function InputComponent() {

      const [{ values, ...rest }, { custom, input }] = useForm(hookParams)

      Object.assign(returnVal, { values, ...rest })
      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.reset} role="form">
            <DatePicker {...custom(inputParams.name)} data-testid={inputParams.name} />
            <input {...input("supporting", "text")} role="text" data-testid="supporting" />
            <button type="submit" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }
   render(<InputComponent />)

   return Object.assign(returnVal, { input: inputParams.name })
}