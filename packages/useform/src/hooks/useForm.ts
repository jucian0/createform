import React from "react"
import dot from 'dot-prop-immutable'
import { create, InitialErrors, InitialTouched } from "../core/create"
import { debounce, isCheckbox, isRadio } from "../utils"



type TypeForm = ReturnType<typeof create>
type TValues<TForm extends TypeForm> = ReturnType<TForm['getValues']>

type UseFormOptions<TValues> = {
   isControlled?: boolean,
   debounce?: number,
   watch?: (values: TValues) => void
}


type OnSubmit<TValues> = (fn: (values: TValues) => void) => (e: React.BaseSyntheticEvent) => void
type Input = (param: FieldParam<InputProps>, ...args: Array<string>) => InputRegisterProps<RefFieldElement>
type SetValues<TValues> = (e: Partial<TValues>) => void
type SetErrors<TValues> = (e: Partial<InitialErrors<TValues>>) => void
type SetTouched<TValues> = (e: Partial<InitialErrors<TValues>>) => void
type Reset = () => void

type UseForm<TForm extends TypeForm> = [
   {
      values: TValues<TForm>,
      errors: InitialErrors<TValues<TForm>>,
      touched: InitialErrors<TValues<TForm>>
   },
   {
      onSubmit: OnSubmit<TValues<TForm>>
      input: Input
      setValues: SetValues<TValues<TForm>>
      setErrors: SetErrors<TValues<TForm>>
      setTouched: SetTouched<TValues<TForm>>
      reset: Reset
   }
]

export type RefFieldElement = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement

export type FieldParam<TInput> = string | TInput
export interface InputProps extends React.InputHTMLAttributes<RefFieldElement> {
   name: string
   type: string
}
export interface InputPartialProps {
   name: string
   defaultValue?: any
   value?: any
   onChange: (...args: Array<any>) => void
   onBlur?: (...args: Array<any>) => void
   onTouchStart?: (...args: Array<any>) => void
   type?: string
   defaultChecked?: any
}
interface InputRegisterProps<T = RefFieldElement> extends InputPartialProps {
   ref?: T extends RefFieldElement
   ? React.RefObject<RefFieldElement extends React.RefObject<infer Ref> ? Ref : never>
   : React.RefObject<T>
}

type ListInputsRef = {
   [x: string]: InputRegisterProps<
      RefFieldElement extends HTMLInputElement ? HTMLInputElement : HTMLTextAreaElement
   >
}

function reducer<TState>(state: TState, nextState: Partial<TState>): TState {
   return { ...state, ...nextState }
}

export function useForm<TForm extends TypeForm>(
   form: TForm,
   options: UseFormOptions<TValues<TForm>>
): UseForm<TForm> {

   const [state, setState] = React.useReducer(reducer, { values: form.getValues(), errors: form.getErrors(), touched: form.getTouched() })
   const listInputsRef = React.useRef<ListInputsRef>(Object.assign({}))
   const setValuesDebounce = React.useCallback(debounce(setState, options.debounce), [])

   /**
 * The purpose that function is set a new value in value ref of an every input element.
 * @param input is an object with properties like ref input.
 * @param value that value is placed on input ref value
 */
   function setRefValue(input: InputRegisterProps<any>, value: any) {
      if (!input?.ref?.current) {
         return
      }

      const type = input.ref.current.type

      if (isRadio(type)) {
         return (input.ref.current.checked = input.ref.current.value === value)
      } else if (isCheckbox(type)) {
         return (input.ref.current.checked = Boolean(value))
      }

      return input.ref.current.value = value || null
   }

   function setRefInputsValues() {
      Object.keys(listInputsRef.current).forEach((key) => {
         setRefValue(listInputsRef.current[key], form.getValues()[key])
      })
   }

   /**
    * That function register every inputs, and it return an input props.
    * @param props {
    *   name: string
    *    defaultValue?: any
    *   value?: any
    *   onChange: (...args: Array<any>) => void
    *   onBlur?: (...args: Array<any>) => void
    *   type?: string
    *   defaultChecked?: any
    * }
    */
   function registerInput(props: InputPartialProps) {
      const inputProps = {
         ...listInputsRef.current,
         [props.name]: { ...props, ref: React.createRef<HTMLInputElement>() },
      } as ListInputsRef

      /**
       * creating an input props a put one on a specific key in listInputsRef.
       */
      listInputsRef.current = inputProps
      return listInputsRef.current[props.name]
   }


   /**
   *
   * @param param is a object with the same properties of native input in react like {type, checked, value ...}
   * @param args get a rest o arguments like type when use approach like this {<input {...input("test", "text")}/>}
   * this function register a default input with default properties.
   */
   function input(
      param: FieldParam<InputProps>,
      ...args: Array<string>
   ): InputRegisterProps<RefFieldElement> {
      const complementProps =
         typeof param === 'string' ? { name: param, type: args[0] } : { ...param }

      /**
       * To turn logic easier has a function to process input checkbox or radio and defaultInputBase for another kind of input like text, data...
       */
      if (isCheckbox(complementProps.type) || isRadio(complementProps.type)) {
         return checkedBase(complementProps)
      }
      return defaultInputBase(complementProps)
   }

   function defaultInputBase(complementProps: InputProps) {
      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
         form.setValues({
            name: e.target.name,
            value:
               complementProps.type === 'number'
                  ? Number(e.target.value)
                  : complementProps.type === 'date'
                     ? e.target.value
                     : complementProps.type === 'file'
                        ? e.target.files
                        : e.target.value,
         })
      }

      function onBlur() {
         form.setTouched({ name: complementProps.name, value: true })
      }

      const props = registerInput({
         defaultValue: form.getValues()[complementProps.name],
         onChange,
         onBlur,
         ...complementProps,
      })

      return props
   }

   function checkedBase(complementProps: InputProps) {
      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
         form.setValues({
            name: e.target.name,
            value: complementProps.type === 'radio' ? e.target.value : e.target.checked,
         })
      }

      function onBlur() {
         form.setTouched({ name: complementProps.name, value: true })
      }

      const props = registerInput({
         defaultChecked:
            complementProps.type === 'radio'
               ? form.getValues()[complementProps.name] === complementProps.value
               : form.getValues()[complementProps.name],
         onChange,
         onBlur,
         ...complementProps,
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
      setRefInputsValues()
   }

   function setErrors(e: Partial<InitialErrors<TValues<TForm>>>) {
      form.setErrors({ name: null, value: e })
   }

   function setTouched(e: Partial<InitialTouched<TValues<TForm>>>) {
      form.setTouched({ name: null, value: e })
   }

   function reset() {
      form.reset()
      setRefInputsValues()
   }

   React.useEffect(() => {
      const subscriber = form.context.subscribe<TValues<TForm>>(e => {
         options.watch?.(e)
         if (options.isControlled) {
            setState(e)
         } else if (options.debounce) {
            setValuesDebounce(e)
         }
      })

      return () => {
         subscriber()
      }
   }, [options])

   return [state as UseForm<TForm>[0], { onSubmit, input, setValues, reset, setErrors, setTouched }]
}
