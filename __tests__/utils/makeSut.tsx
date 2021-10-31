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

export function makeRadioSut({ hookParams, inputParams, onSubmit }: any) {
   const hookState: UseFormReturnType<any> = Object.assign({})

   function InputComponent() {
      const { state, register, ...rest } = useForm<any>(hookParams)
      Object.assign(hookState, { state, ...rest })

      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.resetForm}>
            <div {...register(inputParams.name)}>
               <input
                  type="radio"
                  name={inputParams.name}
                  value="option-1"
                  data-testid="radio-1"
               />
               <input
                  type="radio"
                  name={inputParams.name}
                  value="option-2"
                  data-testid="radio-2"
               />
               <input
                  type="radio"
                  name={inputParams.name}
                  value="option-3"
                  data-testid="radio-3"
               />
            </div>
            <button type="submit" data-testid="on-submit"></button>
            <button type="reset" data-testid="on-reset"></button>
         </form>
      )
   }

   const sut = render(<InputComponent />)

   return { sut, hookState }
}

export function makeSelectSut({ hookParams, inputParams, onSubmit }: any) {
   const hookState: UseFormReturnType<any> = Object.assign({})

   function InputComponent() {
      const { state, register, ...rest } = useForm<any>(hookParams)
      Object.assign(hookState, { state, ...rest })

      return (
         <form onSubmit={rest.onSubmit(onSubmit)} onReset={rest.resetForm}>
            <select
               {...register(inputParams.name)}
               data-testid={inputParams.name}
            >
               <option value="option-1">Option 1</option>
               <option value="option-2" data-testid="option-2">
                  Option 2
               </option>
               <option value="option-3">Option 3</option>
            </select>
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
   type = 'text',
   touched = false,
   error = ''
}: {
   value?: any
   name?: string
   type?: string
   touched?: boolean
   error?: string
}) {
   return {
      hookParams: {
         initialValues: {
            inputName: value
         },
         initialTouched: {
            inputName: touched
         },
         initialErrors: {
            inputName: error
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
