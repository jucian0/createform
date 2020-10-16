import React from "react";
import dot from 'dot-prop-immutable'
import { debounce, makeDotNotation } from "../utils";
import { ValidationError, Schema as YupSchema } from "yup";
import { createState } from "../core/observable";


type Options<T> = {
   initialValues?: T,
   initialErrors?: T,
   initialTouched?: T,
   isControlled?: boolean,
   debounced?: number,
   schemaValidation?: YupSchema<T>
}

type State<T> = {
   values?: T,
   errors?: T,
   touched?: T,
}

type Ref = {
   current: HTMLInputElement
}

type Change = React.ChangeEvent<HTMLInputElement>

type ChangeState<T> = State<T> | ((state: State<T>) => State<T>)

type PathValue<T> = keyof T

export type UseFormReturnType<T> = {
   setForm: (next: ChangeState<T>) => void
   resetForm: () => void
   setFieldsValue: (next: ChangeState<T>) => void
   setFieldValue: (path: PathValue<T>, value: any) => void
   resetFieldsValue: () => void
   resetFieldValue: (path: PathValue<T>) => void
   //setFieldsTouched:()

   /**
    * change setTouched function to turn the same logic of setFieldsValue
    */
}


export function useFormTest<TO extends Options<TO['initialValues']>>({
   initialErrors = {},
   initialValues = {},
   initialTouched = {},
   ...options }: TO) {

   const refs = React.useRef<{ current: { [path: string]: Ref } }>({} as any)

   const { current: state$ } = React.useRef(createState({
      values: initialValues,
      errors: initialErrors,
      touched: initialTouched,
   }))

   const [state, setState] = React.useState<State<TO["initialValues"]>>({})


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
         return async (e: Change) => {
            return state$.setState(state => ({ ...state, values: { ...state.values, [e.target.name]: e.target.value } }))
         }
      }

      return (e: Change) => {
         return state$.setState(state => ({ ...state, touched: { ...state.touched, [e.target.name]: true } }))
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




   function setForm(next: State<TO['initialValues']> | ((state: State<TO['initialValues']>) => State<TO['initialValues']>)) {
      const nextState = typeof next === "function" ? next(state) : next

      state$.setState(nextState as any)

      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(nextState.values, path) || dot.get(nextState.values, path))
      })
   }

   function resetForm() {
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(initialValues, path) || null)
      })
      state$.setState({ values: initialValues, errors: initialValues, touched: initialTouched })
   }

   function setFieldsValue(next: Partial<TO['initialValues']> | ((values: Partial<TO["initialValues"]>) => Partial<TO['initialValues']>)) {
      const nextState = typeof next === "function" ? next(state) : next

      state$.setState(state => ({ ...state, values: nextState }))

      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(nextState, path) || dot.get(nextState, path))
      })
   }

   function setFieldValue(path: keyof typeof initialValues, value: any) {
      state$.setState(state => ({ ...state, values: dot.set(state.values, path as string, value) }))
      setRefValue(path as string, value)
   }

   function resetFieldsValue() {
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(initialValues, path) || null)
      })
      state$.setState(state => ({ ...state, values: initialValues }))
   }

   function resetFieldValue(path: keyof typeof initialValues) {
      const value = dot.get(initialValues, path as string) || undefined
      state$.setState(state => ({ ...state, values: dot.set(state.values, path as string, value) }))
      setRefValue(path as string, value)
   }

   function setFieldsTouched(touched: Partial<TO['initialTouched']>) {
      state$.setState(state => ({ ...state, touched }))
   }

   function setFieldTouched(path: keyof typeof initialValues, value: boolean) {
      state$.setState(state => ({ ...state, touched: dot.set(state.touched, path as string, value) }))
   }

   function resetFieldsTouched(touched: Partial<TO['initialTouched']>) {
      setFieldsTouched(makeResetAllTouchedPayload())
   }

   function resetFieldTouched(path: keyof typeof initialValues) {
      const value = dot.get(initialTouched, path as string) || false
      state$.setState(state => ({ ...state, touched: dot.set(state.touched, path as string, value) }))
   }

   function setFieldsError(errors: Partial<TO['initialErrors']>) {
      state$.setState(state => ({ ...state, errors }))
   }

   function setFieldError(path: keyof typeof initialValues, value: any) {
      state$.setState(state => ({ ...state, errors: dot.set(state.errors, path as string, value) }))
   }

   function resetFieldsError() {
      state$.setState(state => ({ ...state, errors: initialErrors }))
   }

   function resetFieldError(path: keyof typeof initialValues) {
      const value = dot.get(initialErrors, path as string) || false
      state$.setState(state => ({ ...state, errors: dot.set(state.errors, path as string, value) }))
   }




   function makeResetAllTouchedPayload() {
      return Object.keys(refs.current).reduce((acc, path) => {
         return dot.set(acc, path, dot.get(initialTouched || {}, path) || false)
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
      return async (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         const values = makeFormPayload()
         try {
            await validate(values)
            fn(values, true)
         } catch (errors) {
            fn(values, false)
            state$.setState(state => ({ ...state, errors, touched: makeAllTouchedPayload() }))

            if (!isControlledOrDebounce()) {
               setState(state => ({ ...state, errors, values, touched: makeAllTouchedPayload() }))
            }
         }
      }
   }

   function validate(values) {
      return options.schemaValidation?.validate(values, { abortEarly: false })
         .then((e) => {
            return {}
         })
         .catch((e: ValidationError) => {
            throw e.inner.reduce((acc, key) => {
               const path = makeDotNotation(key.path)
               return dot.set(acc, path, key.message)
            }, {})
         })
   }

   async function handleChange(next) {
      try {
         await validate(next.values)
         if (options.isControlled) {
            setState(next)
         } else if (options.debounced) {
            setValueDebounce(next)
         }
      } catch (errors) {
         if (options.isControlled) {
            setState({ ...next, errors })
         } else if (options.debounced) {
            setValueDebounce({ ...next, errors })
         }
      }
   }

   React.useEffect(() => {
      const subscriber = state$.subscribe(handleChange)

      return () => {
         subscriber()
      }
   }, [])

   React.useEffect(() => {
      if (initialValues) {
         Object.keys(refs.current).forEach(path => {
            setRefValue(path, dot.get(initialValues, path))
         })
      }

      addEvents('input', 'blur')
      return () => {
         removeEvents('input', 'blur')
      }
   }, [refs])


   return { register, state, resetForm, setForm, setTouched, resetTouched, onSubmit, setValues, resetValues, setValue }

}
