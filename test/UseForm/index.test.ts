// import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from '../../src/index'
import { renderHook } from '@testing-library/react-hooks'
import { fireEvent, act, screen } from '@testing-library/react'
import { setup, customSetup } from '../utils'
import * as yup from 'yup'

describe('Test useForm hook controlled inputs forms', () => {
  it('should set correct properties', () => {
    const {
      result: {
        current: [{ }, { input }],
      },
    } = renderHook(() => useForm({ initialValues: { 'test-name': 'my-name-test' } }))

    act(() => {
      expect(String(input('test-name', 'text'))).toEqual(
        String({
          name: 'test-name',
          type: 'text',
          defaultValue: 'my-name-test',
          onBlur: () => { },
          onChange: () => { },
          /**
           * ref is change when component is mounted
           */
          ref: { current: null },
        })
      )
    })
  })

  it('should change formState when change input value type text', () => {
    const hookParams = {
      initialValues: { 'test-name': 'my-name-test' },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
    })

    expect(result.values).toEqual({ 'test-name': 'new-name-test' })
  })

  it('should change formState when change input value type checkbox', () => {
    const hookParams = {
      initialValues: { 'test-accept': true },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-accept',
      type: 'checkbox',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.click(screen.getByTestId(inputParams.name))
    })

    expect(result.values).toEqual({ 'test-accept': false })
  })

  it('should change formState when change input value type number', () => {
    const hookParams = {
      initialValues: { 'test-number': 22 },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-number',
      type: 'number',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 40 } })
    })

    expect(result.values).toEqual({ 'test-number': 40 })
  })

  it('should change formState when change input value type date', () => {
    const initialDate = '2018-01-01'
    const finalDate = '2018-12-31'
    const hookParams = {
      initialValues: { 'test-date': initialDate },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-date',
      type: 'date',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: finalDate } })
    })

    expect(result.values).toEqual({ 'test-date': finalDate })
  })

  it('should change formState when change input value type file', () => {
    const finalFile = require('./../utils/tes-input-file.json')
    const hookParams = {
      initialValues: { 'test-file': null },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-file',
      type: 'file',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { files: [finalFile] } })
    })

    expect(result.values).toEqual({ 'test-file': [finalFile] })
  })

  it('should change formState when change input value type radio', () => {
    const hookParams = {
      initialValues: { 'test-radio': 'France' },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-radio',
      type: 'radio',
      value: 'Brazil',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.click(screen.getByDisplayValue(inputParams.value))
    })

    expect(result.values).toEqual({ 'test-radio': 'Brazil' })
  })
})

describe('Test useForm hook debounce inputs forms', () => {
  jest.useFakeTimers()

  it('should change formState when change input value type text', async () => {
    const hookParams = {
      initialValues: { 'test-name': 'my-name-test' },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-name',
      type: 'text',
    }

    const resp = await setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
      jest.advanceTimersByTime(300)
    })

    expect(resp.values).toEqual({ 'test-name': 'new-name-test' })
  })

  it('should change formState when change input value type checkbox', () => {
    const hookParams = {
      initialValues: { 'test-accept': true },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-accept',
      type: 'checkbox',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.click(screen.getByTestId(inputParams.name))
      jest.advanceTimersByTime(300)
    })

    expect(result.values).toEqual({ 'test-accept': false })
  })

  it('should change formState when change input value type number', () => {
    const hookParams = {
      initialValues: { 'test-number': 22 },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-number',
      type: 'number',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 40 } })
      jest.advanceTimersByTime(300)
    })

    expect(result.values).toEqual({ 'test-number': 40 })
  })

  it('should change formState when change input value type date', () => {
    const initialDate = '2018-01-01'
    const finalDate = '2018-12-31'
    const hookParams = {
      initialValues: { 'test-date': initialDate },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-date',
      type: 'date',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: finalDate } })
      jest.advanceTimersByTime(300)
    })

    expect(result.values).toEqual({ 'test-date': finalDate })
  })

  it('should change formState when change input value type file', () => {
    const finalFile = require('./../utils/tes-input-file.json')
    const hookParams = {
      initialValues: { 'test-file': null },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-file',
      type: 'file',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { files: [finalFile] } })
      jest.advanceTimersByTime(300)
    })

    expect(result.values).toEqual({ 'test-file': [finalFile] })
  })

  it('should change formState when change input value type radio', () => {
    const hookParams = {
      initialValues: { 'test-radio': 'France' },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-radio',
      type: 'radio',
      value: 'Brazil',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.click(screen.getByDisplayValue(inputParams.value))
      jest.advanceTimersByTime(300)
    })

    expect(result.values).toEqual({ 'test-radio': 'Brazil' })
  })
})

describe('Test functions returned by hook', () => {
  it('should reset specific input', () => {
    const initialValues = {
      'test-reset': 'my-value',
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-reset',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
    })

    expect(result.values).toEqual({ 'test-reset': 'new-name-test' })

    act(() => {
      result.resetInput('test-reset')
    })

    expect(result.values).toEqual(initialValues)
  })

  it('should reset specific input type checkbox', () => {
    const initialValues = {
      'test-reset': true,
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-reset',
      type: 'checkbox',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.click(screen.getByTestId(inputParams.name))
    })

    expect(result.values).toEqual({ 'test-reset': false })

    act(() => {
      result.resetInput('test-reset')
    })

    expect(result.values).toEqual(initialValues)
  })

  it('should reset all inputs', () => {
    const initialValues = {
      'test-reset': 'my-value',
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-reset',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
    })

    expect(result.values).toEqual({ 'test-reset': 'new-name-test' })

    act(() => {
      result.reset()
    })

    expect(result.values).toEqual(initialValues)
  })

  it('should call callback onSubmit', () => {
    const callback = jest.fn()
    const initialValues = {
      'test-reset': 'my-value',
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-reset',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams, onSubmit: callback })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
    })

    expect(result.values).toEqual({ 'test-reset': 'new-name-test' })

    act(() => {
      fireEvent.click(screen.getByTestId('on-submit'))
    })

    expect(callback).toBeCalled()
  })

  it('should setInputs', () => {
    const initialValues = {
      'test-set-inputs': 'my-value',
    }

    const setInputsValues = {
      'test-set-inputs': 'value-changed',
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-set-inputs',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    act(() => {
      result.setInputs(setInputsValues)
    })

    expect(result.values).toEqual(setInputsValues)
  })

  it('should setValue specific input', () => {
    const initialValues = {
      'test-set-input': 'old-value',
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-set-input',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    act(() => {
      result.setInput('test-set-input', 'new-value')
    })

    expect(result.values).toEqual({ 'test-set-input': 'new-value' })
  })
})

describe('Test onBlur event', () => {
  it('should set onBlur on defaultInputs', () => {
    const hookParams = {
      initialValues: { 'test-on-blur': 'my-name' },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-on-blur',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    act(() => {
      fireEvent.blur(screen.getByTestId(inputParams.name))
    })

    expect(result.touched[inputParams.name]).toEqual(true)
  })

  it('should set onBlur on boolean inputs', () => {
    const hookParams = {
      initialValues: { 'test-on-blur': 'my-name' },
      debounce: 300,
    }

    const inputParams = {
      name: 'test-on-blur',
      type: 'checkbox',
    }

    const result = setup({ hookParams, inputParams })

    act(() => {
      fireEvent.blur(screen.getByTestId(inputParams.name))
    })

    expect(result.touched[inputParams.name]).toEqual(true)
  })
})

describe('Test form with validation', () => {
  const schemaValidation = yup.object().shape({
    'test-validation': yup.string().required('this field is required'),
  })

  it('should call callback function when validation is correct', () => {
    const callback = jest.fn()
    const initialValues = {
      'test-validation': null,
    }

    const hookParams = {
      initialValues,
      isControlled: true,
      schemaValidation,
    }

    const inputParams = {
      name: 'test-validation',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams, onSubmit: callback })
    act(() => {
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
    })

    expect(result.values).toEqual({ 'test-validation': 'new-name-test' })

    act(() => {
      fireEvent.click(screen.getByTestId('on-submit'))
    })

    expect(callback).toBeCalled()
  })

  it("shouldn't call callback function when validation is wrong", () => {
    const callback = jest.fn()
    const initialValues = {
      'test-validation-wrong': null,
    }

    const hookParams = {
      initialValues,
      isControlled: true,
      schemaValidation,
    }

    const inputParams = {
      name: 'test-validation-wrong',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams, onSubmit: callback })

    act(() => {
      fireEvent.click(screen.getByTestId('on-submit'))
    })

    expect(callback).not.toBeCalled()
  })
})

describe('Test custom inputs', () => {
  const initialDate = new Date('2018-01-01')
  const finalDate = new Date('2018-12-31')

  it('should call cllback when change the value', () => {
    const callback = jest.fn()
    const initialValues = {
      'test-custom': initialDate,
    }

    const hookParams = {
      initialValues,
      isControlled: true,
    }

    const inputParams = {
      name: 'test-custom',
    }

    const result = customSetup({ hookParams, inputParams, onSubmit: callback })

    act(() => {
      fireEvent.change(screen.getByRole('textbox'), { target: { value: finalDate } })
    })

    expect(result.values).toEqual({ 'test-custom': finalDate })
  })

  it('should set onBlur on custom input', () => {
    const hookParams = {
      initialValues: { 'test-custom-blur': initialDate },
      isControlled: true,
    }

    const inputParams = {
      name: 'test-custom-blur',
    }

    const result = customSetup({ hookParams, inputParams })

    act(() => {
      fireEvent.blur(screen.getByRole('textbox'))
    })

    expect(result.touched[inputParams.name]).toEqual(true)
  })

  it('should change state input without onChange or debounce because custom input exist', () => {
    const hookParams = {
      initialValues: {
        'test-custom-blur': initialDate,
        supporting: null,
      },
    }

    const inputParams = {
      name: 'test-custom-blur',
    }

    const result = customSetup({ hookParams, inputParams })

    act(() => {
      fireEvent.change(screen.getByTestId('supporting'), { target: { value: 'new-name-test' } })
      fireEvent.change(screen.getByRole('textbox'), { target: { value: finalDate } })
    })

    expect(result.values.supporting).toEqual('new-name-test')
  })
})
