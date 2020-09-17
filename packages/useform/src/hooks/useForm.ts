import React from "react"
import { create, InitialErrors, InitialTouched } from "../core/create"
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
type SetValues<TValues> = (e: Partial<TValues>) => void
type SetErrors<TValues> = (e: Partial<InitialErrors<TValues>>) => void
type SetTouched<TValues> = (e: Partial<InitialTouched<TValues>>) => void
type Reset = () => void

type UseForm<TForm extends TypeForm> = [
   TValues<TForm>,
   {
      onSubmit: OnSubmit<TValues<TForm>>
      input: Input
      setValues: SetValues<TValues<TForm>>
      setErrors: SetErrors<TValues<TForm>>
      setTouched: SetTouched<TValues<TForm>>
      reset: Reset
   }
]

export function useForm<TForm extends TypeForm>(
   form: TForm,
   options: UseFormOptions<TValues<TForm>>
): UseForm<TForm> {

   const [state, setState] = React.useState<ReturnType<TForm["get"]>>(form.get() as any)
   const listInputsRef = React.useRef<any>({})

   React.useEffect(() => {
      const subscriber = form.context.subscribe<TValues<TForm>>(e => {
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
         form.setValues({ name: e.target.name, value: e.target.value })
      }

      const props = registerInput({
         defaultValue: form.get()[name],
         name,
         type,
         onChange
      })

      return props
   }

   function onSubmit(fn: (values: TValues<TForm>) => void) {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         form.onSubmit(fn)
      }
   }

   function setValues(e: Partial<TValues<TForm>>) {
      form.setValues({ name: null, value: e })
   }

   function setErrors(e: Partial<InitialErrors<TValues<TForm>>>) {
      form.setErrors({ name: null, value: e })
   }

   function setTouched(e: Partial<InitialTouched<TValues<TForm>>>) {
      form.setTouched({ name: null, value: e })
   }

   function reset() {
      form.reset()
   }

   return [state, { onSubmit, input, setValues, reset, setErrors, setTouched }]
}