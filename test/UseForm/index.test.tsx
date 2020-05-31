// import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from '../../src/index'
import { renderHook, act } from '@testing-library/react-hooks';
import { fireEvent, screen } from '@testing-library/react';
import { setup } from '../utils';


describe("Test useForm hook controlled inputs forms", () => {

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
         initialValues: { "test-accept": true },
         onChange: true
      }

      const inputParams = {
         name: "test-accept",
         type: "checkbox"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.click(screen.getByTestId(inputParams.name))

      expect(result.values).toEqual({ "test-accept": false })
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

   it("should change formState when change input value type date", () => {
      const initialDate = "2018-01-01"
      const finalDate = "2018-12-31"
      const hookParams = {
         initialValues: { "test-date": initialDate },
         onChange: true
      }

      const inputParams = {
         name: "test-date",
         type: "date"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: finalDate } })

      expect(result.values).toEqual({ "test-date": finalDate })
   })

   it("should change formState when change input value type file", () => {
      const finalFile = require('./../utils/tes-input-file.json')
      const hookParams = {
         initialValues: { "test-file": null },
         onChange: true
      }

      const inputParams = {
         name: "test-file",
         type: "file"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { files: [finalFile] } })

      expect(result.values).toEqual({ "test-file": [finalFile] })
   })

   it("should change formState when change input value type radio", () => {
      const hookParams = {
         initialValues: { "test-radio": "France" },
         onChange: true
      }

      const inputParams = {
         name: "test-radio",
         type: "radio",
         value: "Brazil"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.click(screen.getByDisplayValue(inputParams.value))

      expect(result.values).toEqual({ "test-radio": "Brazil" })
   })
})

describe("Test useForm hook debounce inputs forms", () => {
   jest.useFakeTimers();

   it("should change formState when change input value type text", async () => {
      const hookParams = {
         initialValues: { "test-name": "my-name-test" },
         debounce: 300
      }

      const inputParams = {
         name: "test-name",
         type: "text"
      }

      const resp = await setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: "new-name-test" } })
      jest.advanceTimersByTime(300);

      expect(resp.values).toEqual({ "test-name": "new-name-test" })
   })

   it("should change formState when change input value type checkbox", () => {
      const hookParams = {
         initialValues: { "test-accept": true },
         onChange: true
      }

      const inputParams = {
         name: "test-accept",
         type: "checkbox"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.click(screen.getByTestId(inputParams.name))
      jest.advanceTimersByTime(300);

      expect(result.values).toEqual({ "test-accept": false })
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
      jest.advanceTimersByTime(300);

      expect(result.values).toEqual({ "test-number": 40 })
   })

   it("should change formState when change input value type date", () => {
      const initialDate = "2018-01-01"
      const finalDate = "2018-12-31"
      const hookParams = {
         initialValues: { "test-date": initialDate },
         onChange: true
      }

      const inputParams = {
         name: "test-date",
         type: "date"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: finalDate } })
      jest.advanceTimersByTime(300);

      expect(result.values).toEqual({ "test-date": finalDate })
   })

   it("should change formState when change input value type file", () => {
      const finalFile = require('./../utils/tes-input-file.json')
      const hookParams = {
         initialValues: { "test-file": null },
         onChange: true
      }

      const inputParams = {
         name: "test-file",
         type: "file"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.change(screen.getByTestId(inputParams.name), { target: { files: [finalFile] } })
      jest.advanceTimersByTime(300);

      expect(result.values).toEqual({ "test-file": [finalFile] })
   })

   it("should change formState when change input value type radio", () => {
      const hookParams = {
         initialValues: { "test-radio": "France" },
         onChange: true
      }

      const inputParams = {
         name: "test-radio",
         type: "radio",
         value: "Brazil"
      }

      const result = setup({ hookParams, inputParams })
      fireEvent.click(screen.getByDisplayValue(inputParams.value))
      jest.advanceTimersByTime(300);

      expect(result.values).toEqual({ "test-radio": "Brazil" })
   })
})