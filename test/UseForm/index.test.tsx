// import { renderHook, act } from '@testing-library/react-hooks'
import { useForm } from '../../src/index'
import { renderHook, act } from '@testing-library/react-hooks';
import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react';

const Input = ({ inputText }) => (<input {...inputText} data-testid="test-name" />)

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

   it("should change formState when change input value", () => {

      const { result: { current: [{ values }, { input }] } } = renderHook(() => useForm({ initialValues: { "test-name": "my-name-test" }, onChange: true }))

      const inputText = input("test-name", "text")

      render(<Input inputText={inputText} />)

      act(() => {

         fireEvent.change(screen.getByTestId("test-name"), { target: { value: 'Good Day' } })


         fireEvent.input(screen.getByTestId("test-name"), {})
         console.log(screen.getByTestId("test-name"))
      })






   })
})