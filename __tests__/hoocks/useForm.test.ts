import { act, fireEvent,screen } from "@testing-library/react"
import { setup } from "../utils"

describe('Test input', ()=>{

   test("should change input's value when dispatch input event",async()=>{
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
        console.log(result)
      })
  
     await expect(result.values).toEqual({ 'test-name': 'new-name-test' })
   })

})