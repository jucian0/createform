import React from "react";
import dot from 'dot-prop-immutable'
import { debounce, makeDotNotation } from "../utils";
import { ValidationError, Schema as YupSchema } from "yup";


type Options<T> = {
   initialValues?: T,
   initialErrors?: T,
   initialTouched?: T,
   isControlled?: boolean,
   debounced?: number,
   schemaValidation?: YupSchema<T>
}

type SetForm<T> = {
   values?: T,
   errors?: T,
   touched?: T,
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
   })


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

   function setForm(nextState: SetForm<TO['initialValues']> | ((state: SetForm<TO['initialValues']>) => SetForm<TO['initialValues']>)) {

      const nState = typeof nextState === "function" ? nextState(state) : nextState

      if (isControlledOrDebounce()) {
         setState(nState as any)
      }
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(nState.values, path) || dot.get(nState.values, path))
      })
   }

   function setValues(nextState: Partial<TO['initialValues']> | ((values: Partial<TO["initialValues"]>) => Partial<TO['initialValues']>)) {
      const nState = typeof nextState === "function" ? nextState(state) : nextState

      if (isControlledOrDebounce()) {
         setState(state => ({ ...state, values: nState }))
      }
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(nState, path) || dot.get(nState, path))
      })
   }

   function resetForm() {
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(options.initialValues, path) || null)
      })
      setState({ values: options.initialValues, errors: options.initialValues, touched: options.initialTouched })
   }

   function setValue(path: keyof typeof options.initialValues, value: { T: keyof typeof options.initialValues[T] }) {
      if (isControlledOrDebounce()) {
         setState(state => ({ ...state, values: dot.set(state.values, path as string, value) }))
      }
      setRefValue(path as string, value)
   }

   function resetValues() {
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(options.initialValues, path) || null)
      })
      if (isControlledOrDebounce()) {
         setState(state => ({ ...state, values: options.initialValues }))
      }
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
            if (isControlledOrDebounce()) {
               setState(state => ({ ...state, errors: {} }))
            }
         })
         .catch((e: ValidationError) => {
            let errors = {}
            e.inner.forEach(key => {
               const path = makeDotNotation(key.path)
               errors = dot.set(errors, path, key.message)
            })

            if (isControlledOrDebounce()) {
               return setState(state => ({ ...state, errors }))
            }
            return setState(state => ({ ...state, errors, touched: makeAllTouchedPayload() }))
         })
   }

   React.useEffect(() => {
      if (isControlledOrDebounce()) {
         validate(state.values)
      }
   }, [state.values])

   React.useEffect(() => {
      if (options.initialValues) {
         Object.keys(refs.current).forEach(path => {
            setRefValue(path, dot.get(options.initialValues, path))
         })
      }

      addEvents('input', 'blur')
      return () => {
         removeEvents('input', 'blur')
      }
   }, [refs])


   return { register, state, resetForm, setForm, setTouched, resetTouched, onSubmit, setValues, resetValues, setValue }

}
