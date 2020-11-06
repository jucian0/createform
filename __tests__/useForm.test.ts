// import {act,  fireEvent,screen } from "@testing-library/react"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { act } from "react-test-renderer"
import { setup } from "./utils"

describe('Set initial options', () => {
  test('should set initial properties', async () => {
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
      value: 'radio',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.change(input, { target: { checked: true } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ radio: 'radio' })
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
