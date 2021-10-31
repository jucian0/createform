import { makeRadioSut, makeSut, makeUseFormParamsMock } from './utils/makeSut'
import * as faker from 'faker'
import { waitFor } from '@testing-library/dom'
import '@testing-library/jest-dom/extend-expect'
import { fireEvent } from '@testing-library/react'

describe('Test useForm arguments', () => {
   test('Should set initial values', async () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word()
      })
      const { hookState } = makeSut(mock)
      await waitFor(() => {
         expect(hookState.state.values).toEqual(mock.hookParams.initialValues)
      })
   })
})

describe('onChange mode tests input events', () => {
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

      console.log(hookState.state.values)

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })

   test('Should update input select value when dispatch input event', () => {
      const mock = makeUseFormParamsMock({
         value: faker.random.word(),
         type: 'select'
      })
      const { hookState, sut } = makeSut(mock)
      const input = sut.getByTestId(mock.inputParams.name)
      const nextValue = faker.random.word()
      fireEvent.input(input, { target: { value: nextValue } })

      expect(hookState.state.values.inputName).toEqual(nextValue)
   })
})

// describe('Set initial options', () => {
//   it('should set initial properties', async () => {
//     const hookParams = {
//       initialValues: {
//         name: 'value-1'
//       },
//       initialErrors: {
//         name: 'invalid value'
//       },
//       initialTouched: {
//         name: false
//       },
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     expect(result.state).toEqual({
//       values: {
//         name: 'value-1'
//       },
//       errors: {
//         name: 'invalid value'
//       },
//       touched: {
//         name: false
//       }
//     })
//   })
// })

// describe('Test inputs events', () => {
//   it("should change text input's value when dispatch input event", async () => {
//     const hookParams = {
//       initialValues: { text: 'my-name-test' },
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'text',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     const input = screen.getByTestId(inputParams.name)

//     act(() => {
//       fireEvent.input(input, { target: { value: 'new-name-test' } })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ text: 'new-name-test' })
//     })
//   })

//   it("should change number input's value when dispatch input event", async () => {
//     const hookParams = {
//       initialValues: { number: '1' },
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'number',
//       type: 'number'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     const input = screen.getByTestId(inputParams.name)

//     act(() => {
//       fireEvent.input(input, { target: { value: 2 } })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ number: '2' })
//     })
//   })

//   it("should change date input's value when dispatch input event", async () => {
//     const initialDate = '2018-01-01'
//     const finalDate = '2018-12-31'

//     const hookParams = {
//       initialValues: { date: initialDate },
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'date',
//       type: 'date'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     const input = screen.getByTestId(inputParams.name)

//     act(() => {
//       fireEvent.input(input, { target: { value: finalDate } })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ date: finalDate })
//     })
//   })

//   it("should change checkbox input's value when dispatch change event", async () => {
//     const hookParams = {
//       initialValues: { checkbox: false },
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'checkbox',
//       type: 'checkbox'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     const input = screen.getByTestId(inputParams.name)

//     act(() => {
//       fireEvent.change(input, { target: { checked: true } })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ checkbox: true })
//     })
//   })

//   it("should change radio input's value when dispatch change event", async () => {
//     const hookParams = {
//       initialValues: { radio: 'radio-1' },
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'radio',
//       type: 'radio',
//       value: 'radio-2'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     const input = screen.getByTestId(inputParams.name)

//     act(() => {
//       fireEvent.click(input)
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ radio: 'radio-2' })
//     })
//   })

//   it("should change text input's touched state when dispatch blur event", async () => {
//     const hookParams = {
//       isControlled: true
//     }

//     const inputParams = {
//       name: 'blur',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })

//     const input = screen.getByTestId(inputParams.name)

//     act(() => {
//       fireEvent.blur(input)
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ blur: true })
//     })
//   })
// })

// describe('Test useForm API', () => {
//   it('should set form state when run setForm', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setForm({
//         values: {
//           name: 'Jesse James'
//         },
//         errors: {
//           name: 'name is required'
//         },
//         touched: {
//           name: true
//         }
//       })
//     })

//     await waitFor(() => {
//       expect(result.state).toEqual({
//         values: { name: 'Jesse James' },
//         errors: { name: 'name is required' },
//         touched: { name: true }
//       })
//     })
//   })

//   it('should reset form state when run resetForm', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setForm({
//         values: {
//           name: 'Jesse James'
//         },
//         errors: {
//           name: 'name is required'
//         },
//         touched: {
//           name: true
//         }
//       })
//     })

//     await waitFor(() => {
//       expect(result.state).toEqual({
//         values: { name: 'Jesse James' },
//         errors: { name: 'name is required' },
//         touched: { name: true }
//       })
//     })

//     act(() => {
//       result.resetForm()
//     })

//     expect(result.state).toEqual({
//       values: { name: 'jesse' },
//       errors: {},
//       touched: {}
//     })
//   })

//   it('should change input value when run setFieldValue', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldValue('name', 'james')
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ name: 'james' })
//     })
//   })

//   it('should change input value when run setFieldsValue', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldsValue({ name: 'james' })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ name: 'james' })
//     })
//   })

//   it('should reset field state when run resetFieldValue', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setForm({
//         values: {
//           name: 'Jesse James'
//         }
//       })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ name: 'Jesse James' })
//     })

//     act(() => {
//       result.resetFieldValue('name')
//     })

//     expect(result.state).toEqual({
//       values: { name: 'jesse' },
//       errors: {},
//       touched: {}
//     })
//   })

//   it('should reset fields state when run resetFieldsValue', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setForm({
//         values: {
//           name: 'Jesse James'
//         }
//       })
//     })

//     await waitFor(() => {
//       expect(result.state.values).toEqual({ name: 'Jesse James' })
//     })

//     act(() => {
//       result.resetFieldsValue()
//     })

//     expect(result.state).toEqual({
//       values: { name: 'jesse' },
//       errors: {},
//       touched: {}
//     })
//   })

//   it('should change input touched when run setFieldTouched', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       },
//       initialTouched: {
//         name: true
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldTouched('name', false)
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ name: true })
//     })
//   })

//   it('should change inputs touched when run setFieldsTouched', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse',
//         email: 'jesse@jasse.com'
//       },
//       initialTouched: {
//         name: false,
//         email: false
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldsTouched({
//         name: true,
//         email: true
//       })
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ name: true, email: true })
//     })
//   })

//   it('should reset field touched when run resetFieldsTouched', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldsTouched({ name: true })
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ name: true })
//     })

//     act(() => {
//       result.resetFieldsTouched()
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ name: false })
//     })
//   })

//   it('should reset field touched when run resetFieldTouched', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldTouched('name', true)
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ name: true })
//     })

//     act(() => {
//       result.resetFieldTouched('name')
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({ name: false })
//     })
//   })

//   it('should change input error when run setFieldError', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldError('name', 'this field is valid')
//     })

//     await waitFor(() => {
//       expect(result.state.errors).toEqual({ name: 'this field is valid' })
//     })
//   })

//   it('should change inputs touched when run setFieldsErrors', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse',
//         email: 'jesse@jasse.com'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldsError({
//         name: 'this field is required',
//         email: 'this field is invalid'
//       })
//     })

//     await waitFor(() => {
//       expect(result.state.errors).toEqual({
//         name: 'this field is required',
//         email: 'this field is invalid'
//       })
//     })
//   })

//   it.only('should reset field error when run resetFieldsError', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldsError({ name: 'this field is required' })
//     })

//     await waitFor(() => {
//       expect(result.state.errors).toEqual({ name: 'this field is required' })
//     })

//     act(() => {
//       result.resetFieldsError()
//     })

//     await waitFor(() => {
//       expect(result.state.errors).toEqual({})
//     })
//   })

//   it('should reset field error when run resetFieldError', async () => {
//     const hookParams = {
//       isControlled: true,
//       initialValues: {
//         name: 'jesse'
//       }
//     }

//     const inputParams = {
//       name: 'name',
//       type: 'text'
//     }

//     const result = makeSut({ hookParams, inputParams })
//     await screen.findAllByTestId('name')

//     act(() => {
//       result.setFieldError('name', 'this field is required')
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({
//         name: 'this field is required'
//       })
//     })

//     act(() => {
//       result.resetFieldTouched('name')
//     })

//     await waitFor(() => {
//       expect(result.state.touched).toEqual({})
//     })
//   })
// })
