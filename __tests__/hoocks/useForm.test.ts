// import {act,  fireEvent,screen } from "@testing-library/react"
import { fireEvent,screen, waitFor, waitForElement } from "@testing-library/react"
import { act } from "react-test-renderer"
import { setup } from "../utils"

describe('Set initial options',()=>{
  test('should set initial properties',()=>{
    const hookParams = {
      initialValues: { 
        name: 'value-1' 
      },
      initialErrors:{
        name:'invalid value'
      },
      initialTouched:{
        name:false
      },
      isControlled: true,
    }

    const inputParams = {
      name:'name',
      type: 'text',
    }

   const result = setup({ hookParams, inputParams })

   expect(result.state).toEqual({ 
    values: { 
      name: 'value-1' 
    },
    errors:{
      name:'invalid value'
    },
    touched:{
      name:false
    },
    })
  })
})

describe('Test input', ()=>{

   test("should change input's value when dispatch input event",async()=>{
      const hookParams = {
         initialValues: { name: 'my-name-test' },
         isControlled: true,
       }
   
       const inputParams = {
         name:'name',
         type: 'text',
       }

      const result = setup({ hookParams, inputParams })

      await waitForElement(() => screen.getByTestId(inputParams.name))

      
      act(() => {
        fireEvent.change(screen.getByTestId(inputParams.name), { target: { value: 'new-name-test' } })
      })

      console.log(screen.getByTestId(inputParams.name))

      await waitFor(()=>{
        expect(result.state.values).toEqual({ name: 'new-name-test' })
      })
   })

})