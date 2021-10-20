import * as React from 'react'
import { FormControl, useForm } from '../../../src/V3/React/CreateField'
import { create } from '../../../src/V3/React/CreateForm'

const form = new FormControl({
   name: 'juciano',
   email: 'juciano@juciano.com',
   age: 18,
   address: new FormControl({
      street: 'Alcides Ulrich',
      number: '125',
      city: 'Itatiba',
      state: 'SP',
      zip: '13255722',
      nested: new FormControl({
         test: ''
      })
   })
})

const Controlled: React.FC = () => {
   const { formControl } = useForm(form)

   console.log(formControl)

   // test()

   //form$.subscribe(e => console.log(e.values))

   return (
      // <div className="row">
      //   <div className="col-lg-12">
      //     <h2>Controlled Form</h2>
      //     <div className="form-group">
      //       <input
      //         placeholder="Name"
      //         className="form-control"
      //         {...register('name')}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <input
      //         placeholder="Test"
      //         className="form-control"
      //         {...register('test.test')}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <input
      //         placeholder="Last email"
      //         className="form-control"
      //         {...register('email')}
      //       />
      //     </div>

      //     <div className="form-group">
      //       <input
      //         placeholder="Range 3th position"
      //         className="form-control"
      //         {...register('number')}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <select className="form-control" {...register('select')}>
      //         <option value="1">1</option>
      //         <option value="2">2</option>
      //         <option value="3">3</option>
      //         <option value="4">4</option>
      //         <option value="5">5</option>
      //       </select>
      //     </div>
      //     <div className="form-group">
      //       <input type="range" className="form-control" {...register('range')} />
      //     </div>
      //     <div className="form-group">
      //       <label htmlFor="">Checkbox</label>
      //       <input
      //         className="form-control"
      //         {...register('checkbox', 'checkbox')}
      //       />
      //     </div>

      //     <div className="form-group" {...register('radio', 'radio')}>
      //       <div className="form-check">
      //         <input
      //           className="form-check-input"
      //           id="1"
      //           type="radio"
      //           value="1"
      //           name="radio"
      //         />
      //         <label className="form-check-label" htmlFor="1">
      //           Option 1
      //         </label>
      //       </div>
      //       <div className="form-check">
      //         <input
      //           className="form-check-input"
      //           id="2"
      //           type="radio"
      //           value="2"
      //           name="radio"
      //         />
      //         <label className="form-check-label" htmlFor="1">
      //           Option 2
      //         </label>
      //       </div>
      //       <div className="form-check">
      //         <input
      //           className="form-check-input"
      //           id="3"
      //           type="radio"
      //           value="3"
      //           name="radio"
      //         />
      //         <label className="form-check-label" htmlFor="3">
      //           Option 3
      //         </label>
      //       </div>
      //     </div>
      //   </div>
      //   <button onClick={() => form$.setFieldValue('name', 'Mudei o seu nome')}>
      //     Change Name
      //   </button>
      //   <button onClick={() => form$.resetFieldValue('test.test')}>
      //     Reset Field Value
      //   </button>
      //   <button onClick={() => form$.resetFormValues()}>Reset Form Values</button>
      // </div>
      <div>Test Forms</div>
   )
}

export default Controlled
