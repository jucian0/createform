import React from "react";
import dot from 'dot-prop-immutable'
import { Action, BaseState, useFormTestReducer } from "./useForm_TEST.reducer";
import { Reducer } from "react";
import { debounce } from "../utils";
import { ValidationError, Schema as YupSchema } from "yup";


type Options<T> = {
   initialValues?: T,
   initialErrors?: T,
   initialTouched?: T,
   isControlled?: boolean,
   debounced?: number,
   schemaValidation?: YupSchema<T>
}

type Ref = {
   current: HTMLInputElement
}

type Change = React.ChangeEvent<HTMLInputElement>

export function useFormTest<TO extends Options<TO['initialValues']>>(options: TO) {

   const touched = React.useRef<TO["initialTouched"]>(options.initialTouched || {})
   const values = React.useRef<TO["initialValues"]>(options.initialValues || {})
   const errors = React.useRef<TO["initialErrors"]>(options.initialErrors || {})
   const refs = React.useRef<{ current: { [key: string]: Ref } }>({} as any)

   const [state, dispatch] = React.useReducer<Reducer<BaseState<TO['initialValues']>, Action>>(
      useFormTestReducer,
      {
         values: options.initialValues || {},
         errors: options.initialErrors || {},
         touched: options.initialTouched || {},
         isValid: isValid(options.initialValues)
      })

   const setValueDebounce = React.useCallback(debounce(dispatch, options.debounced || 300), [])

   function register(path: string) {
      const newRefs = {
         ...refs.current,
         [path]: React.createRef<Ref>()
      }

      refs.current = newRefs
      return { name: path, ref: refs.current[path] }
   }

   function handleEvent(event: string) {
      if (event === 'input') {
         return (e: Change) => {
            const nextState = dot.set(values.current, e.target.name, e.target.value)
            values.current = nextState
         }
      }

      return (e: Change) => {
         const nextState = dot.set(touched.current, e.target.name, true)
         touched.current = nextState
      }
   }

   function addEvents(...args: Array<string>) {
      Object.keys(refs.current).forEach(key => {
         args.forEach(event => refs.current[key].current.addEventListener(event, handleEvent(event)))
      })
   }

   function removeEvents(...args: Array<string>) {
      Object.keys(refs.current).forEach(key => {
         args.forEach(event => refs.current[key].current.removeEventListener(event, handleEvent(event)))
      })
   }

   function setRefValue(path: string, value: any) {
      refs.current[path].current.value = value || null
   }

   function setForm(e: Partial<TO['initialValues']>) {
      values.current = e
      Object.keys(refs.current).forEach(key => {
         setRefValue(key, dot.get(e, key) || dot.get(values.current, key))
      })
   }

   function resetForm() {
      Object.keys(refs.current).forEach(key => {
         setRefValue(key, dot.get(options.initialValues, key) || null)
         setForm(dot.set(values.current, key, dot.get(options.initialValues || {}, key) || null))
      })
   }

   function setTouched(e: Partial<TO['initialTouched']>) {
      touched.current = e
   }

   function resetTouched(e: Partial<TO['initialTouched']>) {
      Object.keys(refs.current).forEach(key => {
         touched.current = dot.set(values.current, key, dot.get(options.initialTouched || {}, key) || false)
      })
   }


   // function handleChanges(e: Action) {
   //    if (options.isControlled) {
   //       return dispatch(e)
   //    } else if (options.debounced) {
   //       return dispatchDebounced(e)
   //    }
   // }

   function onSubmit(fn: (values: TO['initialValues']) => void) {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         validate(values.current)
         fn(values.current)
      }
   }

   function isValid(values) {
      return options.schemaValidation.isValidSync(values)
   }

   function validate(values) {
      options.schemaValidation?.validate(values, { abortEarly: false })
         .then((e) => {
            errors.current = {}
         })
         .catch((e: ValidationError) => {
            e.inner.forEach(key => {
               const path = key.path
                  .split('[')
                  .join('.')
                  .split(']')
                  .join('')
               errors.current = dot.set(errors, path, key.message)
            })

         })
   }

   React.useEffect(() => {
      if (!options.initialErrors) {
         validate(options.initialValues)
      }

      if (options.initialValues) {
         setForm(options.initialValues)
      }
   }, [])

   React.useEffect(() => {
      addEvents('input', 'blur')
      return () => {
         removeEvents('input', 'blur')
      }
   }, [refs])


   return { register, state: { ...state, touched: touched.current, values: values.current }, resetForm, setForm, setTouched, resetTouched, onSubmit }

}
