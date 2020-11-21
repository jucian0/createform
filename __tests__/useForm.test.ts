// import {act,  fireEvent,screen } from "@testing-library/react"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { act } from "react-test-renderer"
import { setup } from "./utils"

describe('Set initial options', () => {
  it('should set initial properties', async () => {
    const hookParams = {
      initialValues: {
        name: 'value-1'
      },
      initialErrors: {
        name: 'invalid value'
      },
      initialTouched: {
        name: false
      },
      isControlled: true,
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    expect(result.state).toEqual({
      values: {
        name: 'value-1'
      },
      errors: {
        name: 'invalid value'
      },
      touched: {
        name: false
      },
    })
  })
})

describe('Test inputs events', () => {

  it("should change text input's value when dispatch input event", async () => {
    const hookParams = {
      initialValues: { text: 'my-name-test' },
      isControlled: true,
    }

    const inputParams = {
      name: 'text',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.input(input, { target: { value: 'new-name-test' } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ text: 'new-name-test' })
    })
  })

  it("should change number input's value when dispatch input event", async () => {
    const hookParams = {
      initialValues: { number: "1" },
      isControlled: true,
    }

    const inputParams = {
      name: 'number',
      type: 'number',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.input(input, { target: { value: 2 } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ number: "2" })
    })
  })

  it("should change date input's value when dispatch input event", async () => {
    const initialDate = '2018-01-01'
    const finalDate = '2018-12-31'

    const hookParams = {
      initialValues: { date: initialDate },
      isControlled: true,
    }

    const inputParams = {
      name: 'date',
      type: 'date',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.input(input, { target: { value: finalDate } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ date: finalDate })
    })
  })


  it("should change checkbox input's value when dispatch change event", async () => {
    const hookParams = {
      initialValues: { checkbox: false },
      isControlled: true,
    }

    const inputParams = {
      name: 'checkbox',
      type: 'checkbox',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.change(input, { target: { checked: true } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ checkbox: true })
    })
  })

  it("should change radio input's value when dispatch change event", async () => {
    const hookParams = {
      initialValues: { radio: 'radio-1' },
      isControlled: true,
    }

    const inputParams = {
      name: 'radio',
      type: 'radio',
      value: 'radio-2',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.click(input)
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ radio: 'radio-2' })
    })
  })

  it("should change text input's touched state when dispatch blur event", async () => {
    const hookParams = {
      isControlled: true,
    }

    const inputParams = {
      name: 'blur',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.blur(input)
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ blur: true })
    })
  })
})

describe('Test useForm API', () => {

  it('should set form state when run setForm', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setForm({
        values: {
          name: "Jesse James"
        },
        errors: {
          name: 'name is required'
        },
        touched: {
          name: true
        }
      })
    })

    await waitFor(() => {
      expect(result.state).toEqual({
        values: { name: 'Jesse James' },
        errors: { name: 'name is required' },
        touched: { name: true }
      })
    })
  })

  it('should reset form state when run resetForm', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setForm({
        values: {
          name: "Jesse James"
        },
        errors: {
          name: 'name is required'
        },
        touched: {
          name: true
        }
      })
    })

    await waitFor(() => {
      expect(result.state).toEqual({
        values: { name: 'Jesse James' },
        errors: { name: 'name is required' },
        touched: { name: true }
      })
    })

    act(() => {
      result.resetForm()
    })

    expect(result.state).toEqual({ values: { name: 'jesse' }, errors: {}, touched: {} })
  })


  it('should change input value when run setFieldValue', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldValue('name', 'james')
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ name: 'james' })
    })
  })

  it('should change input value when run setFieldsValue', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldsValue({ 'name': 'james' })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ name: 'james' })
    })
  })


  it('should reset field state when run resetFieldValue', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setForm({
        values: {
          name: "Jesse James"
        }
      })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ name: 'Jesse James' })
    })

    act(() => {
      result.resetFieldValue('name')
    })

    expect(result.state).toEqual({ values: { name: 'jesse' }, errors: {}, touched: {} })
  })


  it('should reset fields state when run resetFieldsValue', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setForm({
        values: {
          name: "Jesse James"
        }
      })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ name: 'Jesse James' })
    })

    act(() => {
      result.resetFieldsValue()
    })

    expect(result.state).toEqual({ values: { name: 'jesse' }, errors: {}, touched: {} })
  })

  it('should change input touched when run setFieldTouched', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      },
      initialTouched:{
        name:true
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldTouched('name', false)
    })

   await waitFor(() => {
      expect(result.state.touched).toEqual({ name: true})
    })
  })

  it('should change inputs touched when run setFieldsTouched', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse',
        email:'jesse@jasse.com'
      },
      initialTouched:{
        name:false,
        email:false
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldsTouched({
        name:true,
        email:true
      })
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ name: true, email:true })
    })
  })


  it('should reset field touched when run resetFieldsTouched', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldsTouched({name:true})
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ name: true })
    })

    act(() => {
      result.resetFieldsTouched()
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ name: false })
    })  
  })


  it('should reset field touched when run resetFieldTouched', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldTouched('name', true)
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ name: true })
    })

    act(() => {
      result.resetFieldTouched('name')
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ name: false })
    })  
  })

















  it('should change input error when run setFieldError', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldError('name', 'this field is valid')
    })

   await waitFor(() => {
      expect(result.state.errors).toEqual({ name: 'this field is valid'})
    })
  })

  it('should change inputs touched when run setFieldsErrors', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse',
        email:'jesse@jasse.com'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldsError({
        name:'this field is required',
        email:'this field is invalid'
      })
    })

    await waitFor(() => {
      expect(result.state.errors).toEqual({ name: 'this field is required', email:'this field is invalid' })
    })
  })


  it.only('should reset field error when run resetFieldsError', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldsError({name:'this field is required'})
    })

    await waitFor(() => {
      expect(result.state.errors).toEqual({ name: 'this field is required' })
    })

    act(() => {
      result.resetFieldsError()
    })

    await waitFor(() => {
      expect(result.state.errors).toEqual({ })
    })  
  })


  it('should reset field error when run resetFieldError', async () => {

    const hookParams = {
      isControlled: true,
      initialValues: {
        name: 'jesse'
      }
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })
    await screen.findAllByTestId('name')

    act(() => {
      result.setFieldError('name', 'this field is required')
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({ name: 'this field is required' })
    })

    act(() => {
      result.resetFieldTouched('name')
    })

    await waitFor(() => {
      expect(result.state.touched).toEqual({})
    })  
  })

})
