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
               data-testid={inputParams.name}
            />
            <button type="submit" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }

   const sut = render(<InputComponent />)

   return { sut, hookState }
}

export function makeUseFormParamsMock({
   value = '',
   name = 'inputName',
   type = 'text'
}: {
   value?: any
   name?: string
   type?: string
}) {
   return {
      hookParams: {
         initialValues: {
            inputName: value
         },
         onSubmit: jest.fn(),
         mode: 'onChange'
      },
      inputParams: {
         name,
         type
      }
   }
}
