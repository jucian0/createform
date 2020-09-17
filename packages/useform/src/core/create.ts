import { Observable } from "./observable"
import dot from 'dot-prop-immutable'

type CreateParams<TValues> = {
   initialValues: TValues,
   schemaValidation?: any,
   initialErrors?: { [k in keyof TValues]?: TValues[k] extends object ? any : string }
   initialTouched?: { [k in keyof TValues]?: TValues[k] extends object ? any : string }
}

// type Flatten<T> = NonObjectPropertiesOf<T> & SubPropertiesOf<T>;

// type NonObjectKeysOf<T> = { [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K }[keyof T];

// type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;


// type ValuesOf<T> = T[keyof T];
// type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

// type SubPropertiesOf<T> = {
//    [K in keyof ObjectValuesOf<T>]: ObjectValuesOf<T>[K]
// };






export type CreateReturn<TValues> = {
   setValues: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   setErrors: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   setTouched: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   context: ReturnType<typeof Observable>,
   get: () => TValues,
   onSubmit: (fn: (e: TValues) => void) => void
   reset: () => void
}


export function create<TValues>({ initialValues }: CreateParams<TValues>): CreateReturn<TValues> {

   const context = Observable()
   let state = {
      values: initialValues,
      errors: {},
      touched: {}
   }

   function changeValues(nextValues: TValues) {
      state.values = nextValues
      notify()
   }

   function get() {
      return state.values
   }

   function notify() {
      context.notify<TValues>(state.values)
   }

   function setValues<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         changeValues(dot.set(state.values, e.name, e.value))
      } else {
         changeValues(Object.assign(state.values, e.value))
      }
   }

   function setErrors<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         changeValues(dot.set(state.errors, e.name, e.value))
      } else {
         changeValues(Object.assign(state.errors, e.value))
      }
   }

   function setTouched<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         changeValues(dot.set(state.touched, e.name, e.value))
      } else {
         changeValues(Object.assign(state.touched, e.value))
      }
   }

   function onSubmit(fn: any) {
      return fn(get())
   }

   function reset() {
      changeValues(initialValues)
   }

   return {
      setValues,
      setErrors,
      setTouched,
      context,
      get,
      onSubmit,
      reset
   }
}