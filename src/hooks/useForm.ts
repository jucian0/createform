import * as React from "react";
import * as dot from 'dot-prop-immutable'
import { debounce, isCheckbox, isRadio, makeDotNotation } from "../utils";
import { ValidationError, Schema as YupSchema } from "yup";
import { createState } from "../core/observable";


type Ref = {
   current: HTMLInputElement
}

type RegisterReturn = {
   name: string,
   ref: Ref
}

type Touched<T extends {}> = { [k in keyof T]: T[k] extends number | string | boolean | Date ? boolean : Touched<T[k]> }
type Errors<T extends {}> = { [k in keyof T]: T[k] extends number | string | boolean | Date ? string : Touched<T[k]> }

export type Options<T> = {
   initialValues?: T,
   initialErrors?: Errors<T>,
   initialTouched?: Touched<T>,
   isControlled?: boolean,
   debounced?: number,
   validationSchema?: YupSchema<T>
   watch?: (e: T) => void
}


export type State<T> = {
   values: T,
   errors: Errors<T>,
   touched: Touched<T>,
}

type Register = (path: string) => RegisterReturn

type Change = React.ChangeEvent<HTMLInputElement>
type ChangeState<T> = T | ((state: T) => T)
type PathValue<T> = keyof T
export type HandleSubmit = (e: React.BaseSyntheticEvent) => Promise<any>

export type UseFormReturnType<T> = {
   setForm: (next: ChangeState<State<T>>) => void
   resetForm: () => void

   setFieldsValue: (next: ChangeState<T>) => void
   setFieldValue: (path: PathValue<T>, value: any) => void
   resetFieldsValue: () => void
   resetFieldValue: (path: PathValue<T>) => void

   setFieldsTouched: (next: ChangeState<Touched<T>>) => void
   setFieldTouched: (path: PathValue<T>, value: boolean) => void
   resetFieldsTouched: () => void
   resetFieldTouched: (path: PathValue<T>) => void

   setFieldError: (path: PathValue<T>, error: any) => void
   setFieldsError: (next: ChangeState<Errors<T>>) => void
   resetFieldError: (path: PathValue<T>) => void
   resetFieldsError: () => void

   state: State<T>
   register: Register,
   onSubmit: (fn: (values: T, isValid: boolean) => void) => HandleSubmit
}


export function useForm<TO>({
   initialErrors = {} as any,
   initialValues = {} as any,
   initialTouched = {} as any,
   ...options }: Options<TO>): UseFormReturnType<TO> {

   const refs = React.useRef<{ current: { [path: string]: Ref } }>({} as any)

   const { current: state$ } = React.useRef(createState({
      values: initialValues,
      errors: initialErrors,
      touched: initialTouched,
   }))

   const [state, setState] = React.useState<State<TO>>({
      values: initialValues,
      errors: initialErrors,
      touched: initialTouched
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

   function handleInputEvent(e: Change) {
      if (options.watch) {
         options.watch(state.values)
      }
      return state$.setState(state => ({ ...state, values: dot.set(state.values, e.target.name, e.target.value) }))
   }

   function handleChangeEvent(e: Change) {
      if (options.watch) {
         options.watch(state.values)
      }
      const value = isCheckbox(e.target.type) ? e.target.checked : e.target.value
      return state$.setState(state => ({ ...state, values: dot.set(state.values, e.target.name, value) }))
   }

   function handleBlurEvent(e: Change) {
      return state$.setState(state => ({ ...state, touched: dot.set(state.touched, e.target.name, true) }))
   }

   function addEvents() {
      Object.keys(refs.current).forEach(path => {
         if (isCheckbox(refs.current[path].current.type) || isRadio(refs.current[path].current.type)) {
            refs.current[path].current.addEventListener('change', handleChangeEvent)
            refs.current[path].current.addEventListener('blur', handleBlurEvent)
         } else {
            refs.current[path].current.addEventListener('input', handleInputEvent)
            refs.current[path].current.addEventListener('blur', handleBlurEvent)
         }
      })
   }

   function removeEvents() {
      Object.keys(refs.current).forEach(path => {
         if (isCheckbox(refs.current[path].current?.type) || isRadio(refs.current[path].current?.type)) {
            refs.current[path].current.removeEventListener('change', handleChangeEvent)
            refs.current[path].current.removeEventListener('blur', handleBlurEvent)
         } else if (refs.current[path].current?.removeEventListener) {
            refs.current[path].current.removeEventListener('input', handleInputEvent)
            refs.current[path].current.removeEventListener('blur', handleBlurEvent)
         }
      })
   }

   function setRefValue(path: string, value: any) {

      if (isCheckbox(refs.current[path].current.type)) {
         return refs.current[path].current.checked = value
      } else if (refs.current[path]?.current?.children) {
         Array.from(refs.current[path]?.current?.children).forEach((element: any) => {
            element.checked = element.value === value
         });
      }
      return refs.current[path].current.value = value || null
   }

   function makeResetAllTouchedPayload() {
      return Object.keys(refs.current).reduce<Touched<TO>>((acc, path) => {
         return dot.set(acc, path, dot.get(initialTouched || {}, path) || false)
      }, {} as Touched<TO>)
   }

   function makeAllTouchedPayload() {
      return Object.keys(refs.current).reduce<Touched<TO>>((acc, path) => {
         return dot.set(acc, path, true)
      }, {} as Touched<TO>)
   }

   function onSubmit(fn: (values: TO, isValid: boolean) => void) {
      return async (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         const values = state$.getState().values
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

   function validate(values: State<TO>['values']) {
      return options.validationSchema?.validate(values, { abortEarly: false })
         .then(() => {
            return {}
         })
         .catch((e: ValidationError) => {
            throw e.inner.reduce((acc, key) => {
               const path = makeDotNotation(key.path)
               return dot.set(acc, path, key.message)
            }, {})
         })
   }

   async function handleChange(next: State<TO>) {
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

   React.useLayoutEffect(() => {
      if (initialValues) {
         Object.keys(refs.current).forEach(path => {
            setRefValue(path, dot.get(initialValues, path))
         })
      }

      addEvents()
      return () => {
         removeEvents()
      }
   }, [refs])

   function setForm(next: State<TO> | ((state: State<TO>) => State<TO>)) {
      const nextState = typeof next === "function" ? next(state) : next

      state$.setState(nextState as any)

      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(nextState.values, path) || dot.get(nextState.values, path))
      })
   }

   function resetForm() {
      Object.keys(refs.current).forEach(path => {
         setRefValue(path, dot.get(initialValues, path))
      })
      state$.setState({ values: initialValues, errors: initialErrors, touched: initialTouched })
   }

   function setFieldsValue(next: Partial<TO> | ((values: TO) => TO)) {
      const nextState = typeof next === "function" ? next(state.values) : next

      state$.setState(state => ({ ...state, values: nextState as TO }))

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

   function setFieldsTouched(next: Partial<Touched<TO>> | ((next: Touched<TO>) => Touched<TO>)) {
      const nextState = typeof next === "function" ? next(state.touched) : next
      state$.setState(state => ({ ...state, touched: nextState as Touched<TO> }))
   }

   function setFieldTouched(path: keyof typeof initialValues, value: boolean = true) {
      state$.setState(state => ({ ...state, touched: dot.set(state.touched, path as string, value) }))
   }

   function resetFieldsTouched() {
      setFieldsTouched(makeResetAllTouchedPayload())
   }

   function resetFieldTouched(path: keyof typeof initialValues) {
      const value = dot.get(initialTouched, path as string) || false
      state$.setState(state => ({ ...state, touched: dot.set(state.touched, path as string, value) }))
   }

   function setFieldsError(next: Partial<Errors<TO>> | ((next: Errors<TO>) => Errors<TO>)) {
      const nextState = typeof next === "function" ? next(state.errors) : next
      state$.setState(state => ({ ...state, errors: nextState as Errors<TO> }))
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


   return {
      register,
      state,
      onSubmit,

      setForm,
      resetForm,

      setFieldValue,
      setFieldsValue,
      resetFieldValue,
      resetFieldsValue,

      setFieldsTouched,
      setFieldTouched,
      resetFieldsTouched,
      resetFieldTouched,


      setFieldError,
      setFieldsError,
      resetFieldError,
      resetFieldsError,
   }

}
