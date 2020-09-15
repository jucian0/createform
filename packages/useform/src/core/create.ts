import { Observer } from "./observable"

type CreateParams<TValues> = {
   initialValues: TValues,
   schemaValidation?: any
}

export type Create<TValues> = {
   setValues: (values: Partial<TValues>) => void,
   subscriber: ReturnType<typeof Observer>,
   get: () => TValues,
   onSubmit: (fn: () => void) => () => () => void
}

export function create<TValues>({ initialValues }: CreateParams<TValues>): Create<TValues> {

   const subscriber = Observer()
   let values = initialValues

   function get() {
      return values
   }

   function setValues(e: any) {
      values = { ...values, ...e }
      subscriber.notify(e)
   }

   function onSubmit(fn: any) {
      return () => fn(get())
   }

   return {
      setValues,
      subscriber,
      get,
      onSubmit
   }
}