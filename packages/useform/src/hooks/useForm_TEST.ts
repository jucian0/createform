import React from "react";
import dot from 'dot-prop-immutable'
import { Action, BaseState, useFormTestReducer } from "./useForm_TEST.reducer";
import { Reducer } from "react";
import { debounce, isEmpty } from "../utils";
import { ValidationError, Schema as YupSchema } from "yup";
import { useValidation } from "./useValidation";


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

   const refs = React.useRef<{ current: { [path: string]: Ref } }>({} as any)

   const [state, setState] = React.useState({
      values: options.initialValues || {},
      errors: options.initialErrors || {},
      touched: options.initialTouched || {},
      // isValid: isValid(options.initialValues)
   })

   //const { errors, isValid } = useValidation(state, options.schemaValidation)

   const setValueDebounce = React.useCallback(debounce(setState, options.debounced || 300), [])

   function isControlledOrDebounce() {
      return options.isControlled || !!options.debounced
   }

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
            if (options.isControlled) {
               return setState(state => ({ ...state, values: { ...state.values, [e.target.name]: e.target.value } }))
            } else if (options.debounced) {
               return setValueDebounce(state => ({ ...state, values: { ...state.values, [e.target.name]: e.target.value } }))
            }
         }
      }

      return (e: Change) => {
         if (isControlledOrDebounce()) {
            return setState(state => ({ ...state, touched: { ...state.touched, [e.target.name]: true } }))
         }
      }
   }

   function addEvents(...args: Array<string>) {
      Object.keys(refs.current).forEach(path => {
         args.forEach(event => refs.current[path].current.addEventListener(event, handleEvent(event)))
      })
   }

   function removeEvents(...args: Array<string>) {
      Object.keys(refs.current).forEach(path => {
         args.forEach(event => refs.current[path].current.removeEventListener(event, handleEvent(event)))
      })
   }

   function setRefValue(path: string, value: any) {
      refs.current[path].current.value = value || null
   }

   function setForm(nextState: Partial<TO['initialValues']>) {
      if (isControlledOrDebounce()) {
         return setState(state => ({ ...state, values: nextState }))
      }
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(nextState, path) || dot.get(nextState, path))
      })
   }

   function resetForm() {
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(options.initialValues, path) || null)
      })
   }

   function setTouched(touched: Partial<TO['initialTouched']>) {
      setState(state => ({ ...state, touched }))
   }

   function resetTouched(touched: Partial<TO['initialTouched']>) {
      setTouched(makeResetAllTouchedPayload(touched))
   }

   function makeResetAllTouchedPayload(touched: Partial<TO['initialTouched']>) {
      return Object.keys(refs.current).reduce((acc, path) => {
         return dot.set(acc, path, dot.get(options.initialTouched || {}, path) || false)
      }, {})
   }

   function makeAllTouchedPayload() {
      return Object.keys(refs.current).reduce((acc, path) => {
         return dot.set(acc, path, true)
      }, {})
   }

   function makeFormPayload() {
      return Object.keys(refs.current).reduce((acc, path) => {
         return dot.set(acc, path, refs.current[path].current.value)
      }, {})
   }

   function onSubmit(fn: (values: TO['initialValues'], isValid: boolean) => void) {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         const values = makeFormPayload()
         validate(values)
         fn(values, isValid(values))
      }
   }

   function isValid(values) {
      return options.schemaValidation.isValidSync(values)
   }

   function validate(values) {
      options.schemaValidation?.validate(values, { abortEarly: false })
         .then((e) => {
            if (!isEmpty(state.errors)) {
               setState(state => ({ ...state, errors: {} }))
            }
         })
         .catch((e: ValidationError) => {
            let errors = {}
            e.inner.forEach(key => {
               const path = key.path
                  .split('[')
                  .join('.')
                  .split(']')
                  .join('')
               errors = dot.set(errors, path, key.message)
            })
            if (isControlledOrDebounce()) {
               setState(state => ({ ...state, errors }))
            }
            setState(state => ({ ...state, errors, touched: makeAllTouchedPayload() }))
         })
   }

   React.useEffect(() => {
      if (isControlledOrDebounce()) {
         validate(state.values)
      }
   }, [state.values])

   React.useEffect(() => {
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


   return { register, state, resetForm, setForm, setTouched, resetTouched, onSubmit }

}
