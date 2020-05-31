import React from 'react'
import { render } from '@testing-library/react';
import { useForm } from '../../src/index'


export function setup({ hookParams, inputParams }) {
   const returnVal = {}

   function InputComponent() {

      const [{ values }, { input }] = useForm(hookParams)

      Object.assign(returnVal, values)
      return <input {...input(inputParams)} data-testid={inputParams.name} />
   }
   render(<InputComponent />)

   return Object.assign({ values: returnVal }, { input: inputParams.name })
}