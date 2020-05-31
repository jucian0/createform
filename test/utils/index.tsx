import React from 'react'
import { render } from '@testing-library/react';
import { useForm } from '../../src/index'
import Select from 'react-select'

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

      const [{ values, ...rest }, { custom }] = useForm(hookParams)

      Object.assign(returnVal, { values, ...rest })
      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.reset} role="form">
            <Select
               classNamePrefix="react-select"
               options={inputParams.options}
               {...custom(inputParams.name)}
            />
            <button type="submit" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }
   render(<InputComponent />)

   return Object.assign(returnVal, { input: inputParams.name })
}