import React, { useEffect, useRef } from 'react'
import * as yup from 'yup'
import './styles.css'
import { useFormTest } from '@forms/useform'
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


const initialValues = {
  name: '',
  email: '',
  password: ''
}

const schemaValidation = yup.object().shape({
  name: yup.string().required("this field is required"),
  email: yup.string().required("this field is required").email("this field must be a valid email"),
  password: yup.string().required('this field is required')
});

const App: React.FC = () => {

  const { register, state, resetForm, setForm, setTouched, resetTouched, onSubmit, setValue } = useFormTest({
    initialValues,
    //schemaValidation,
    isControlled: true,
    //debounced: 500
  })



  function handleSetForm() {
    setForm(state => ({
      ...state,
      values: {
        ...state.values,
        name: 'Juciano',
        email: 'jose@jose.com'
      }
    }))
  }

  function handleSetTouched() {
    setTouched({
      name: false,
      email: true
    })
  }

  function handleSubmit(e: typeof initialValues, isValid) {
    console.log(e, isValid)
  }


  useEffect(() => {
    //  console.log(state)
  }, [state])


  return (
    <section>
      <form >
        <div>
          <input placeholder="Name" {...register('name')} />
          <span className="error">{state.touched?.name && state.errors?.name}</span>
        </div>
        <div>
          <input placeholder="E-mail" {...register('email')} />
          <span className="error">{state.touched?.email && state.errors?.email}</span>
        </div>
        <div>
          <input placeholder="Password" {...register('password')} />
          <span className="error">{state.touched?.password && state.errors?.password}</span>
        </div>
        <div>
          <input placeholder="Score" type="range" {...register('score')} />
          <span className="error">{state.touched?.score && state.errors?.score}</span>
        </div>
        <div>
          <input placeholder="Date" type="date" {...register('date')} />
          <span className="error">{state.touched?.date && state.errors?.date}</span>
        </div>
        <div>
          <input placeholder="File" type="file" {...register('file')} />
          <span className="error">{state.touched?.file && state.errors?.file}</span>
        </div>
        <div>
          <button type="button" onClick={resetForm}>resetForm</button>
          <button type="button" onClick={handleSetForm}>setForm</button>
          <button type="button" onClick={handleSetTouched}>setTouched</button>
          <button type="button" onClick={resetTouched}>resetTouched</button>
          <button type="button" onClick={onSubmit(handleSubmit)}>submit</button>
        </div>
      </form>
    </section>
  )
}

export default App