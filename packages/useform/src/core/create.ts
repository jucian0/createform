import { Observable } from "./observable"
import dot from 'dot-prop-immutable'

type CreateParams<TValues> = {
   initialValues: TValues,
   schemaValidation?: any,
   initialErrors?: { [k in keyof TValues]?: TValues[k] extends object ? TValues[k] : string }
   // initialTouched?: Flatten<TValues> //{ [k in keyof TValues]?: boolean }
}

type Flatten<T> = NonObjectPropertiesOf<T> & SubPropertiesOf<T>;

type NonObjectKeysOf<T> = { [K in keyof T]: T[K] extends Array<any> ? K : T[K] extends object ? never : K }[keyof T];

type NonObjectPropertiesOf<T> = Pick<T, NonObjectKeysOf<T>>;


type ValuesOf<T> = T[keyof T];
type ObjectValuesOf<T> = Exclude<Extract<ValuesOf<T>, object>, Array<any>>;

type SubPropertiesOf<T> = {
   [K in keyof ObjectValuesOf<T>]: ObjectValuesOf<T>[K]
};






export type CreateReturn<TValues> = {
   set: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
   formState: ReturnType<typeof Observable>,
   get: () => TValues,
   onSubmit: (fn: (e: TValues) => void) => void
   reset: () => void
}


export function create<TValues>({ initialValues }: CreateParams<TValues>): CreateReturn<TValues> {

   const formState = Observable()
   let values = {
      values: initialValues,
      errors: {},
      onChanged: {}
   }

   function changeValues(nextValues: TValues) {
      values = nextValues
      notify()
   }

   function get() {
      return values
   }

   function notify() {
      formState.notify<TValues>(values)
   }

   function set<TValue extends TValues>(e: { name: string, value: TValue }) {
      if (e.name) {
         changeValues(dot.set(values, e.name, e.value))
      } else {
         changeValues(Object.assign(values, e.value))
      }
   }

   function onSubmit(fn: any) {
      return fn(get())
   }

   function reset() {
      changeValues(initialValues)
   }

   return {
      set,
      formState,
      get,
      onSubmit,
      reset
   }
}