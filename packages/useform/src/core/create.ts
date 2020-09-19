import { Observable } from "./observable"
import dot from 'dot-prop-immutable'
import { ValidationError, Schema as YupSchema } from "yup"

export type InitialErrors<TValues> = { [k in keyof TValues]?: TValues[k] extends object ? any : string }
export type InitialTouched<TValues> = { [k in keyof TValues]?: TValues[k] extends object ? any : string }

export type CreateReturn<TValues> = {
   setValues: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   setErrors: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   setTouched: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   context: ReturnType<typeof Observable>,
   getValues: () => TValues,
   getErrors: () => {},
   getTouched: () => {},
   onSubmit: (fn: (e: TValues) => void) => void
   reset: () => void
}

type CreateParams<TValues> = {
   initialValues: TValues,
   schemaValidation?: any,
   initialErrors?: InitialErrors<TValues>
   initialTouched?: InitialTouched<TValues>
}


export function create<TValues>({ initialValues, schemaValidation, initialErrors = {}, initialTouched = {} }: CreateParams<TValues>): CreateReturn<TValues> {

   const context = Observable()
   let state = {
      values: initialValues,
      errors: {},
      touched: {}
   }

   function setState(path: string, nextValues: TValues) {
      state = dot.set(state, path, nextValues)
      notify()
   }

   function getValues() {
      return state.values
   }

   function getTouched() {
      return state.touched
   }

   function getErrors() {
      return state.errors
   }

   function notify() {
      context.notify(state)
   }

   function setValues<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         setState('values', dot.set(state.values, e.name, e.value))
      } else {
         setState('values', Object.assign(state.values, e.value))
      }
   }

   function setErrors<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         setState('errors', dot.set(state.errors, e.name, e.value))
      } else {
         setState('errors', Object.assign(state.errors, e.value))
      }
   }

   function setTouched<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         setState('touched', dot.set(state.touched, e.name, e.value))
      } else {
         setState('touched', Object.assign(state.touched, e.value))
      }
   }

   function onSubmit(fn: any) {
      return fn(getValues())
   }

   function reset() {
      setState('values', initialValues)
      setState('errors', initialErrors)
      setState('touched', initialTouched)
   }

   return {
      setValues,
      setErrors,
      setTouched,
      context,
      getValues,
      getErrors,
      getTouched,
      onSubmit,
      reset
   }
}
