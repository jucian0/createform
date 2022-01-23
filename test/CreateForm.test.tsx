import React from 'react'
import each from 'jest-each'
import faker from 'faker'
import { createForm } from './../src/CreateForm'
import { CreateFormArgs } from '../src/Types'
import { renderHook } from '@testing-library/react-hooks'
import { waitFor, render, fireEvent } from '@testing-library/react'

function makeSut(args: CreateFormArgs<any> = {}, mode = 'onChange' as any) {
   const state = {}

   const spy = jest.fn()
   const useForm = createForm(args)

   const { result: sut } = renderHook(() =>
      useForm({ mode, onChange: spy, onBlur: spy, onSubmit: spy })
   )
   function Component() {
      const form = sut.current
      Object.assign(state, form)

      return (
         <form onSubmit={form.handleSubmit(spy)}>
            <input data-testid="name" ref={form.register('name')} />
            <input data-testid="email" ref={form.register('email')} />
            <input data-testid="password" ref={form.register('password')} />
            <button type="submit" data-testid="submit">
               Submit
            </button>
         </form>
      )
   }

   const element = render(<Component />)

   return {
      element,
      spy,
      sut
   }
}

function makeMockedValues() {
   return {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      password: faker.internet.password()
   }
}

describe('CreateForm', () => {
   each(['onChange', 'debounce']).it(
      'Should init the hook with the initial properties - [%s] mode',
      mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         expect(form.sut.current.state.values).toEqual(initialValues)
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run setFieldValue - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newValue = faker.name.findName()
         form.sut.current.setFieldValue('name', newValue)

         await waitFor(() => {
            expect(form.sut.current.state.values.name).toEqual(newValue)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run setFieldError - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newError = faker.name.findName()
         form.sut.current.setFieldError('name', newError)

         await waitFor(() => {
            expect(form.sut.current.state.errors.name).toEqual(newError)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run setFieldTouched - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         form.sut.current.setFieldTouched('name', true)

         await waitFor(() => {
            expect(form.sut.current.state.touched.name).toEqual(true)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run setFieldsValue - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const newValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         form.sut.current.setFieldsValue(newValues)

         await waitFor(() => {
            expect(form.sut.current.state.values).toEqual(newValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run setFieldsError - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newErrors = makeMockedValues()
         form.sut.current.setFieldsError(newErrors)

         await waitFor(() => {
            expect(form.sut.current.state.errors).toEqual(newErrors)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run setFieldsTouched - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newTouched = {
            name: true,
            email: true,
            password: true
         }
         form.sut.current.setFieldsTouched(newTouched)

         await waitFor(() => {
            expect(form.sut.current.state.touched).toEqual(newTouched)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run resetErrors - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newErrors = makeMockedValues()
         form.sut.current.setFieldsError(newErrors)

         await waitFor(() => {
            expect(form.sut.current.state.errors).toEqual(newErrors)
         })
         form.sut.current.resetErrors()
         await waitFor(() => {
            expect(form.sut.current.state.errors).toEqual({})
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run resetValues - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newValues = makeMockedValues()
         form.sut.current.setFieldsValue(newValues)

         await waitFor(() => {
            expect(form.sut.current.state.values).toEqual(newValues)
         })
         form.sut.current.resetValues()
         await waitFor(() => {
            expect(form.sut.current.state.values).toEqual(initialValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run resetTouched - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newTouched = {
            name: true,
            email: true,
            password: true
         }
         form.sut.current.setFieldsTouched(newTouched)
         await waitFor(() => {
            expect(form.sut.current.state.touched).toEqual(newTouched)
         })

         form.sut.current.resetTouched()

         await waitFor(() => {
            expect(form.sut.current.state.touched).toEqual({})
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update the hook when run reset - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const newValues = makeMockedValues()
         await waitFor(() => {
            form.sut.current.setFieldsValue(newValues)
         })
         form.sut.current.reset()

         await waitFor(() => {
            expect(form.sut.current.state.values).toEqual(initialValues)
            expect(form.sut.current.state.touched).toEqual({})
            expect(form.sut.current.state.errors).toEqual({})
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'SHould call handleSubmit function when run onSubmit - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const submitButton = form.element.getByTestId('submit')

         fireEvent.click(submitButton)
         // since we aren't passing any validation we assume the form is valid
         const submittedValues = [initialValues, true]

         await waitFor(() => {
            expect(form.spy).toHaveBeenCalledWith(...submittedValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should call handleSubmit function when run onSubmit with errors - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const initialErrors = {
            name: faker.name.findName()
         }

         const form = makeSut({ initialValues, initialErrors }, mode)
         const submitButton = form.element.getByTestId('submit')

         fireEvent.click(submitButton)
         // since we are passing an error validation we assume the form is invalid
         const submittedValues = [initialValues, false]

         await waitFor(() => {
            expect(form.spy).toHaveBeenCalledWith(...submittedValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should call onChange function when any change event happens - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const input = form.element.getByTestId('name')
         const nextValue = faker.name.findName()
         const nextValues = {
            ...initialValues,
            name: nextValue
         }

         fireEvent.input(input, { target: { value: nextValue } })

         await waitFor(() => {
            expect(form.spy).toHaveBeenCalledWith(nextValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should call onBlur function when any blur event happens - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const input = form.element.getByTestId('name')
         fireEvent.blur(input)

         await waitFor(() => {
            expect(form.spy).toHaveBeenCalledWith(initialValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update hook state when a change event happens - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const input = form.element.getByTestId('name')
         const nextValue = faker.name.findName()
         const nextValues = {
            ...initialValues,
            name: nextValue
         }

         fireEvent.input(input, { target: { value: nextValue } })

         await waitFor(() => {
            expect(form.sut.current.state.values).toEqual(nextValues)
         })
      }
   )

   each(['onChange', 'debounce']).it(
      'Should update hook state when a blur event happens - [%s] mode',
      async mode => {
         const initialValues = makeMockedValues()
         const form = makeSut({ initialValues }, mode)
         const input = form.element.getByTestId('name')
         fireEvent.blur(input)

         await waitFor(() => {
            expect(form.sut.current.state.touched).toEqual({ name: true })
         })
      }
   )
})
