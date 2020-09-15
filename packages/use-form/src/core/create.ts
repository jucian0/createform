export function create<TValues = any>({ initialValues }: any) {

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