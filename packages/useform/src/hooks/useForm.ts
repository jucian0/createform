import React from "react"
import { create } from "../core/create"
import { debounce } from "../utils"



type TypeForm = ReturnType<typeof create>
type TValues<TForm extends TypeForm> = ReturnType<TForm['get']>

type UseFormOptions<TValues> = {
   isControlled?: boolean,
   debounce?: number,
   watch?: (values: TValues) => void
}



type OnSubmit = (fn: (values: TValues<TypeForm>) => void) => (e: React.BaseSyntheticEvent) => void
type Input = (name: string, type: string) => any
type Set = (e: Partial<TValues<TypeForm>>) => void
type Reset = () => void

type UseForm<TForm extends TypeForm> = [
   TValues<TForm>,
   {
      onSubmit: OnSubmit,
      input: Input,
      set: Set,
      reset: Reset
   }
]



export function useForm<TForm extends TypeForm>(
   formContext: TForm,
   options: UseFormOptions<TValues<TForm>>
): UseForm<TForm> {

   const [state, setState] = React.useState<ReturnType<TForm["get"]>>(formContext.get() as any)
   const listInputsRef = React.useRef<any>({})
   const initialValues = React.useRef<ReturnType<TForm["get"]>>(formContext.get() as any)

   React.useEffect(() => {
      if (options.isControlled) {
         const sub = formContext.subscriber.subscriber(setState)
         return () => {
            sub()
         }
      } else if (options.debounce) {
         const setValuesDebounce = debounce(setState, options.debounce)
         const sub = formContext.subscriber.subscriber(setValuesDebounce)
         return () => {
            sub()
         }
      }
   }, [options])

   function registerInput(props: any) {
      const inputProps = {
         ...listInputsRef.current,
         [props.name]: { ...props, ref: React.createRef<HTMLInputElement>() },
      }

      listInputsRef.current = inputProps
      return listInputsRef.current[props.name]
   }

   function input(name: string, type: string) {

      function onChange(e: any) {
         formContext.set({ [e.target.name]: e.target.value })
      }

      const props = registerInput({
         defaultValue: formContext.get()[name],
         name,
         type,
         onChange
      })

      return props

   }

   function onSubmit(fn: (values: TValues<TForm>) => void) {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         formContext.onSubmit(fn)
      }
   }

   function set(e: Partial<TValues<TForm>>) {
      formContext.set(e)
   }

   function reset() {
      formContext.set(initialValues.current)
   }

   return [state, { onSubmit, input, set, reset }]
}