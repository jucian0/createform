import * as React from 'react'
import { render } from '@testing-library/react';
import { useForm } from '../../src/index'


export  function setup({ hookParams, inputParams, onSubmit }: any) {
   const returnVal: any = {}

   function InputComponent() {
      const [ready, setReady] = React.useState(false)

      const {state, register,...rest} = useForm<any>(hookParams)

      Object.assign(returnVal, { state, ...rest })


      React.useEffect(()=>{
         setReady(true)
      },[state.touched])

      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.resetForm}>
            {
              ready && <span data-testid="ready"></span>
            }
            <input {...register(inputParams.name)} {...inputParams} data-testid={inputParams.name} />
            <button type="submit" id="22" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }
  
   render(<InputComponent />)

   return returnVal
}