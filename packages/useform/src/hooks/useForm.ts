import React from "react"
import { create } from "../core/create"

type UseFormOptions<TValues> = {
   isControlled?: boolean,
   debounce?: number,
   watch?: (values: TValues) => void
}

export function useForm<TForm extends ReturnType<typeof create>>(
   formContext: TForm,
   options: UseFormOptions<ReturnType<TForm['get']>>
): [ReturnType<TForm['get']>, any] {

   const [state, setState] = React.useState<ReturnType<TForm["get"]>>(formContext.get() as any)
   const listInputsRef = React.useRef<any>({})

   React.useEffect(() => {
      const sub = formContext.subscriber.subscriber(setState)

      return () => {
         sub()
      }
   }, [])

   function registerInput(props: any) {
      const inputProps = {
         ...listInputsRef.current,
         [props.name]: { ...props, ref: React.createRef<HTMLInputElement>() },
      }

      /**
       * creating a input props an put one on a specific key in listInputsRef.
       */
      listInputsRef.current = inputProps
      return listInputsRef.current[props.name]
   }

   function register(name: string, type: string) {

      function onChange(e: any) {
         formContext.setValues({ [e.target.name]: e.target.value })
      }

      const props = registerInput({
         defaultValue: formContext.get()[name],
         name,
         type,
         onChange
      })

      return props

   }

   return [state, { onSubmit: formContext.onSubmit, register }]
}