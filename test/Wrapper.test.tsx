import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import faker from 'faker'
import { Wrapper } from '../src/Wrapper'
import { createForm } from '../src'
import { renderHook } from '@testing-library/react-hooks'

function makeSut() {
   const sut = render(<Setup />)
   return {
      sut
   }
}

function Component(props: any) {
   function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
      props.onChange(e.target.value)
   }

   return (
      <div>
         <input
            data-testid="name"
            type="text"
            value={props.value}
            onChange={handleOnChange}
         />
      </div>
   )
}

const value = faker.random.word()
const useForm = createForm({
   initialValues: {
      name: value
   }
})

function Setup() {
   const form = useForm()

   return <Wrapper component={Component} ref={form.register('name')} />
}

describe('Wrapper', () => {
   it('Should render children with the value', () => {
      const { sut } = makeSut()
      const input = sut.getByTestId('name') as HTMLInputElement
      expect(input.value).toBe(value)
   })

   it('Should set the custom input value', async () => {
      const form = renderHook(() => useForm({ mode: 'onChange' }))
      const { sut } = makeSut()
      const input = sut.getByTestId('name') as HTMLInputElement
      const nextValue = faker.random.word()
      fireEvent.change(input, { target: { value: nextValue } })

      await waitFor(() => {
         expect(form.result.current.state.values.name).toBe(nextValue)
      })
   })
})
