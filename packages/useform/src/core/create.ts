import { Observable } from "./observable"

type CreateParams<TValues> = {
   initialValues: TValues,
   schemaValidation?: any
}

export type CreateReturn<TValues> = {
   set: (e: Partial<TValues>) => void,
   subscriber: Observable<TValues>,
   get: () => TValues,
   onSubmit: (fn: (e: TValues) => void) => void
}

export function create<TValues>({ initialValues }: CreateParams<TValues>): CreateReturn<TValues> {

   const subscriber = new Observable(initialValues)
   let values = initialValues

   function get() {
      return values
   }

   function set(e: any) {
      values = { ...values, ...e }
      subscriber.notify(e)
   }

   function onSubmit(fn: any) {
      return fn(get())
   }

   return {
      set,
      subscriber,
      get,
      onSubmit
   }
}