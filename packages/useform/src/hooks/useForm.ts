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



type OnSubmit<TValues> = (fn: (values: TValues) => void) => (e: React.BaseSyntheticEvent) => void
type Input = (name: string, type: string) => any
type Set<TValues> = (e: Partial<TValues>) => void
type Reset = () => void

type UseForm<TForm extends TypeForm> = [
   TValues<TForm>,
   {
      onSubmit: OnSubmit<TValues<TForm>>,
      input: Input,
      set: Set<TValues<TForm>>,
      reset: Reset
   }
]



export function useForm<TForm extends TypeForm>(
   context: TForm,
   options: UseFormOptions<TValues<TForm>>
): UseForm<TForm> {

   const [state, setState] = React.useState<ReturnType<TForm["get"]>>(context.get() as any)
   const listInputsRef = React.useRef<any>({})

   React.useEffect(() => {
      const subscriber = context.formState.subscribe<TValues<TForm>>(e => {
         options.watch?.(e)
         if (options.isControlled) {
            setState(e)
         } else if (options.debounce) {
            const setValuesDebounce = debounce(setState, options.debounce)
            setValuesDebounce(e)
         }
      })

      return () => {
         subscriber()
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

      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
         context.set({ name: e.target.name, value: e.target.value })
      }

      const props = registerInput({
         defaultValue: context.get()[name],
         name,
         type,
         onChange
      })

      return props
   }

   function onSubmit(fn: (values: TValues<TForm>) => void) {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         context.onSubmit(fn)
      }
   }

   function set(e: Partial<TValues<TForm>>) {
      context.set({ name: null, value: e })
   }

   function reset() {
      context.reset()
   }

   return [state, { onSubmit, input, set, reset }]
}