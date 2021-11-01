import {
   makeHandleChangeSut,
   makeRadioSut,
   makeSelectSut,
   makeSut,
   makeUseFormParamsMock
} from './utils/makeSut'
import * as faker from 'faker'
import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent } from '@testing-library/react'

describe('Test initial state', () => {
   test('Should set initial values', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.values).toEqual(mock.hookParams.initialValues)
      })
   })

   test('Should set initial errors', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.errors).toEqual(mock.hookParams.initialErrors)
      })
   })

   test('Should set initial touched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: faker.datatype.boolean()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.touched).toEqual(mock.hookParams.initialTouched)
      })
   })
})

describe('Test handle functions to setField/value/error/touched and resetField/value/error/touched', () => {
   test('Should change input state when run setFieldValue', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newValue = faker.random.word()

      act(() => {
         hookState.setFieldValue(mock.inputParams.name, newValue)
      })

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(newValue)
      })
   })

   test('Should change input state when run setFieldError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newError = faker.random.words()

      act(() => {
         hookState.setFieldError(mock.inputParams.name, newError)
      })

      await waitFor(() => {
         expect(hookState.state.errors.inputName).toEqual(newError)
      })
   })

   test('Should change input state when run setFieldTouched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: false
      })
      const { hookState } = makeSut(mock)
      const newTouched = true

      act(() => {
         hookState.setFieldTouched(mock.inputParams.name, newTouched)
      })

      await waitFor(() => {
         expect(hookState.state.touched.inputName).toEqual(newTouched)
      })
   })

   test('Should reset input state when run resetFieldError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newError = faker.random.words()

      act(() => {
         hookState.setFieldError(mock.inputParams.name, newError)
      })

      await waitFor(() => {
         expect(hookState.state.errors.inputName).toEqual(newError)
      })

      act(() => {
         hookState.resetFieldError(mock.inputParams.name)
      })

      await waitFor(() => {
         expect(hookState.state.errors.inputName).toEqual(
            mock.hookParams.initialErrors.inputName
         )
      })
   })

   test('Should reset input state when run resetFieldTouched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: false
      })
      const { hookState } = makeSut(mock)
      const newTouched = true

      act(() => {
         hookState.setFieldTouched(mock.inputParams.name, newTouched)
      })

      await waitFor(() => {
         expect(hookState.state.touched.inputName).toEqual(newTouched)
      })

      act(() => {
         hookState.resetFieldTouched(mock.inputParams.name)
      })

      await waitFor(() => {
         expect(hookState.state.touched.inputName).toEqual(
            mock.hookParams.initialTouched.inputName
         )
      })
   })

   test('Should reset input state when run resetFieldValue', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newValue = faker.random.word()

      act(() => {
         hookState.setFieldValue(mock.inputParams.name, newValue)
      })

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(newValue)
      })

      act(() => {
         hookState.resetFieldValue(mock.inputParams.name)
      })

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(
            mock.hookParams.initialValues.inputName
         )
      })
   })
})

describe('Test handle functions to setFields/value/error/touched and resetFields/values/errors/touched', () => {
   test('Should change input state when run setFieldsValue', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newValues = {
         inputName: faker.random.word(),
         inputEmail: faker.random.word()
      }

      act(() => {
         hookState.setFieldsValue(newValues)
      })

      await waitFor(() => {
         expect(hookState.state.values).toEqual(newValues)
      })
   })

   test('Should change input state when run setFieldsError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newErrors = {
         inputName: faker.random.words(),
         inputEmail: faker.random.words()
      }

      act(() => {
         hookState.setFieldsError(newErrors)
      })

      await waitFor(() => {
         expect(hookState.state.errors).toEqual(newErrors)
      })
   })

   test('Should change input state when run setFieldsTouched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: faker.datatype.boolean()
      })
      const { hookState } = makeSut(mock)
      const newTouched = {
         inputName: faker.datatype.boolean(),
         inputEmail: faker.datatype.boolean()
      }

      act(() => {
         hookState.setFieldsTouched(newTouched)
      })
   })

   test('Should reset input state when run resetFieldsValue', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newValues = {
         inputName: faker.random.word(),
         inputEmail: faker.random.word()
      }

      act(() => {
         hookState.setFieldsValue(newValues)
      })

      await waitFor(() => {
         expect(hookState.state.values).toEqual(newValues)
      })

      act(() => {
         hookState.resetFieldsValue()
      })

      await waitFor(() => {
         expect(hookState.state.values).toEqual(mock.hookParams.initialValues)
      })
   })

   test('Should reset input state when run resetFieldsError', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newErrors = {
         inputName: faker.random.words(),
         inputEmail: faker.random.words()
      }

      act(() => {
         hookState.setFieldsError(newErrors)
      })

      await waitFor(() => {
         expect(hookState.state.errors).toEqual(newErrors)
      })

      act(() => {
         hookState.resetFieldsError()
      })

      await waitFor(() => {
         expect(hookState.state.errors).toEqual(mock.hookParams.initialErrors)
      })
   })

   test('Should reset input state when run resetFieldsTouched', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         touched: faker.datatype.boolean()
      })
      const { hookState } = makeSut(mock)
      const newTouched = {
         inputName: faker.datatype.boolean(),
         inputEmail: faker.datatype.boolean()
      }

      act(() => {
         hookState.setFieldsTouched(newTouched)
      })

      await waitFor(() => {
         expect(hookState.state.touched).toEqual(newTouched)
      })

      act(() => {
         hookState.resetFieldsTouched()
      })

      await waitFor(() => {
         expect(hookState.state.touched).toEqual(mock.hookParams.initialTouched)
      })
   })
})

describe('Test form handle functions', () => {
   test('Should change form state when run setForm', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         error: faker.random.words()
      })
      const { hookState } = makeSut(mock)
      const newState = {
         values: {
            inputName: faker.random.word()
         },
         errors: {},
         touched: {}
      }

      act(() => {
         hookState.setForm(newState)
      })

      await waitFor(() => {
         expect(hookState.state).toEqual(newState)
      })
   })

   test('Should change form state when run resetForm', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      const newState = {
         values: {
            inputName: faker.random.word()
         },
         errors: {},
         touched: {}
      }

      act(() => {
         hookState.setForm(newState)
      })

      await waitFor(() => {
         expect(hookState.state).toEqual(newState)
      })

      act(() => {
         hookState.resetForm()
      })

      await waitFor(() => {
         expect(hookState.state).toEqual({
            values: {
               inputName: mock.hookParams.initialValues.inputName
            },
            errors: { inputName: '' },
            touched: { inputName: false }
         })
      })
   })
})

describe('Tests input event and state manipulation', () => {
   test('Should update input value when dispatch input event', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.name.firstName()
      fireEvent.input(input, { target: { value: nextValue } })

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(nextValue)
      })
   })

   test('Should update input number value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.datatype.number(),
         type: 'number'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.datatype.number()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input checkbox value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.datatype.boolean(),
         type: 'checkbox'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.datatype.number()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input range value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.datatype.number({ min: 0, max: 100 }),
         type: 'range'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.datatype.number()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input date value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'date'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input time value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'time'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input datetime-local value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'datetime-local'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input month value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'month'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input week value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.date.past(),
         type: 'week'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = new Date(faker.date.past()).toTimeString()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input color value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.internet.color(),
         type: 'color'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.internet.color()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input radio value when dispatch input event', async () => {
      const mock = makeUseFormParamsMock({
         value: 'option-1'
      })
      const { hookState, sut } = makeRadioSut(mock)
      const input = sut.getByTestId('radio-2')
      const nextValue = 'option-2'
      fireEvent.click(input)

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input select value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: 'option-1'
      })
      const { hookState, sut } = makeSelectSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = 'option-2'
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })
})

describe('Tests useForm mode', () => {
   test('Should update input text value just when dispatch blur event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.lorem.words(),
         type: 'text',
         mode: 'onBlur'
      })

      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.lorem.words()
      fireEvent.input(input, { target: { value: nextValue } })
      expect(hookState.state.values.inputName).toEqual(
         mock.hookParams.initialValues.inputName
      )

      fireEvent.blur(input)
      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input text value just when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.lorem.words(),
         type: 'text'
      })

      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.lorem.words()

      fireEvent.blur(input, { target: { value: nextValue } })
      expect(hookState.state.values.inputName).toEqual(
         mock.hookParams.initialValues.inputName
      )

      fireEvent.input(input, { target: { value: nextValue } })
      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input text value just 500ms after dispatch input event', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.lorem.words(),
         type: 'text',
         mode: 'debounced'
      })

      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.lorem.words()

      fireEvent.input(input, { target: { value: nextValue } })
      expect(hookState.state.values.inputName).toEqual(
         mock.hookParams.initialValues.inputName
      )

      await waitFor(() => {
         expect(hookState.state.values.inputName).toEqual(nextValue)
      })
   })

   test('Should receive form value when submit form', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.lorem.words(),
         type: 'text',
         mode: 'onSubmit'
      })

      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.lorem.words()
      const onSubmitParams = [
         {
            inputName: nextValue
         },
         true
      ]

      fireEvent.input(input, { target: { value: nextValue } })
      expect(hookState.state.values.inputName).toEqual(
         mock.hookParams.initialValues.inputName
      )

      fireEvent.submit(sut.getByTestId('form'))

      await waitFor(() => {
         expect(mock.onSubmit).toHaveBeenCalledWith(...onSubmitParams)
      })
   })

   test('Should change input value when run handleChange function', () => {
      const mock = makeUseFormParamsMock({
         value: faker.lorem.words(),
         type: 'text'
      })

      const { hookState, sut } = makeHandleChangeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.lorem.words()
      fireEvent.change(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })
})
