// import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from '../../src/index'
import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent, screen } from '@testing-library/react';
import { setup } from '../utils';


describe("UseForm hook ControlledForms forms", () => {


   it("should set correct properties", () => {

      const { result: { current: [{ }, { input }] } } = renderHook(() => useForm({ initialValues: { "test-name": "my-name-test" } }))

      act(() => {
         expect(String(input("test-name", "text"))).toEqual(String({
            name: "test-name",
            type: "text",
            defaultValue: "my-name-test",
            onBlur: () => { },
            onChange: () => { },
            /**
             * ref is change when component is mounted
             */
            ref: { current: null }
         }))
      })
   })

   it("should change formState when change input value type text", () => {
      const hookParams = {
         initialValues: { "test-name": "my-name-test" },
         onChange: true
      }

      const inputParams = {
         name: "test-name",
         type: "text"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: "new-name-test" } })

      expect(result.values).toEqual({ "test-name": "new-name-test" })
   })

   it("should change formState when change input value type checkbox", () => {
      const hookParams = {
         initialValues: { "test-accept": false },
         onChange: true
      }

      const inputParams = {
         name: "test-accept",
         type: "checkbox"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.click(screen.getByTestId(inputParams.name))

      expect(result.values).toEqual({ "test-accept": true })
   })

   it("should change formState when change input value type number", () => {
      const hookParams = {
         initialValues: { "test-number": 22 },
         onChange: true
      }

      const inputParams = {
         name: "test-number",
         type: "number"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 40 } })

      expect(result.values).toEqual({ "test-number": 40 })
   })
})