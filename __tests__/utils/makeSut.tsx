import React from 'react'
import { render } from '@testing-library/react'
import { useForm } from '../../src/index'
import { UseFormReturnType } from '../../src/types'

export function makeSut({ hookParams, inputParams, onSubmit }: any) {
   const hookState: UseFormReturnType<any> = Object.assign({})

   function InputComponent() {
      const { state, register, ...rest } = useForm<any>(hookParams)

      Object.assign(hookState, { state, ...rest })

      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.resetForm}>
            <input
               {...register(inputParams.name)}
               {...inputParams}
               data-testid={inputParams.name}
            />
            <button type="submit" id="22" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }

   const sut = render(<InputComponent />)

   return { sut, hookState }
}
