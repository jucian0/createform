import React, { useEffect, useRef } from 'react'
import * as yup from 'yup'
import './styles.css'
import { useForm, create, useCustomInput, useFormTest } from '@forms/useform'
import Select from 'react-select'

// const options = [
//   { value: 'chocolate', label: 'Chocolate', },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' }
// ]

// const optionsColor = [
//   { value: 'red', label: 'RED', },
//   { value: 'blue', label: 'BLUE' },
//   { value: 'green', label: 'GREEN' }
// ]


// const schemaValidation = yup.object().shape({
//   name: yup.string().required("this field is required"),
//   email: yup.string().required("this field is required").email("this field must be a valid email"),
// });


// const form = create({
//   initialValues: {
//     name: '',
//     email: '',
//     iceCream: {
//       value: 'strawberry', label: 'Strawberry'
//     }
//   },
//   schemaValidation
// })

// //const test = create()

// const App: React.FC = () => {

//   const [state, { input, onSubmit, reset, setValues, setTouched, setErrors }] = useForm(form,
//     {
//       //debounce: 500,
//       //isControlled: true,
//       watch: e => {
//         //console.log(e)
//       }
//     }
//   )

//   const register = useCustomInput(form)

//   React.useEffect(() => {
//     console.log(state.values)
//   }, [state])


//   React.useEffect(() => {
//     setTimeout(() => {
//       // setValues({
//       //   name: 'jose antonio',
//       //   // email: 'jose@olimpio.com'
//       // })

//       // setTouched({
//       //   name: true
//       // })

//       // setErrors({
//       //   name: 'Invalid'
//       // })
//     }, 3000)
//   }, [])


//   return (
//     <section>
//       <form onSubmit={onSubmit(e => {
//         // console.log(e, '<<<<<<<<<< submit')
//       })} onReset={() => reset()}>
//         <div>
//           <input placeholder="name" {...input('name', 'text')} />
//           <span className="error">{state.touched.name && state.errors.name}</span>
//         </div>
//         <div>
//           <input placeholder="email" {...input('email', 'email')} />
//           <span className="error">{state.touched.email && state.errors.email}</span>
//         </div>
//         <div>
//           <input placeholder="password" {...input('passwords.test', 'password')} />
//         </div>
//         <div>
//           <input placeholder="password" {...input('password', 'password')} />
//         </div>
//         <div>
//           <Select
//             placeholder="IceCream"
//             className="select"
//             {...register("iceCream")}
//             options={options}
//           />
//         </div>
//         <div>
//           <Select
//             placeholder="Color"
//             className="select"
//             {...register("color.favorite")}
//             options={optionsColor}
//           />
//         </div>
//         <div>
//           <button type="reset">reset</button>
//           <button type="submit">submit</button>
//         </div>
//       </form>
//     </section>
//   )
// }

// export default App


const App: React.FC = () => {


  const { register, setValues, reset, state } = useFormTest({
    initialValues: {
      name: 'Jose Antonio',
      email: 'jose@jose.com'
    },
    debounced: 1000
  })


  useEffect(() => {
    console.log(state)
  }, [state])

  return (
    <section>
      <form >
        <div>
          <input placeholder="Name" {...register('name')} />
        </div>
        <div>
          <input placeholder="E-mail" {...register('email')} />
        </div>
        <div>
          <input placeholder="Password" {...register('password')} />
        </div>
        <div>
          <button type="button" onClick={reset}>reset</button>
          <button type="button" onClick={() => setValues({ name: 'juciano de carvalho', email: 'ze@ze.com' })}>submit</button>
        </div>
      </form>
    </section>
  )
}

export default App