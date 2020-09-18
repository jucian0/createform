import { Observable } from "./observable"
import dot from 'dot-prop-immutable'

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
// type Flatten<T> = NonObjectPropertiesOf<T> & SubPropertiesOf<T>;

// type NonObjectKeysOf<T> = { [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K }[keyof T];

// type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;


// type ValuesOf<T> = T[keyof T];
// type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

// type SubPropertiesOf<T> = {
//    [K in keyof ObjectValuesOf<T>]: ObjectValuesOf<T>[K]
// };



export function create<TValues>({ initialValues }: CreateParams<TValues>): CreateReturn<TValues> {

   const context = Observable()
   let state = {
      values: initialValues,
      errors: {},
      touched: {}
   }

   function changeValues(path: string, nextValues: TValues) {
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
         changeValues('values', dot.set(state.values, e.name, e.value))
      } else {
         changeValues('values', Object.assign(state.values, e.value))
      }
   }

   function setErrors<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         changeValues('errors', dot.set(state.errors, e.name, e.value))
      } else {
         changeValues('errors', Object.assign(state.errors, e.value))
      }
   }

   function setTouched<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         changeValues('touched', dot.set(state.touched, e.name, e.value))
      } else {
         changeValues('touched', Object.assign(state.touched, e.value))
      }
   }

   function onSubmit(fn: any) {
      return fn(getValues())
   }

   function reset() {
      changeValues('values', initialValues)
      changeValues('errors', initialValues)
      changeValues('touched', initialValues)
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
