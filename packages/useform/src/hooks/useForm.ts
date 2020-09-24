import React from "react"
import { create } from "../core/create"
import { debounce, isCheckbox, isRadio } from "../utils"
import { Errors, Touched } from "../core/observable"



type TypeForm = ReturnType<typeof create>
type TValues<TForm extends TypeForm> = TForm['getValues']

type UseFormOptions<TValues> = {
   isControlled?: boolean,
   debounce?: number,
   watch?: (values: TValues) => void
}


type OnSubmit<TValues> = (fn: (values: TValues) => void) => (e: React.BaseSyntheticEvent) => void
type Input = (param: FieldParam<InputProps>, ...args: Array<string>) => InputRegisterProps<RefFieldElement>
type SetValues<TValues> = (e: Partial<TValues> | ((e: TValues) => TValues)) => void
type SetErrors<TValues> = (e: Partial<Errors<TValues>> | ((e: Errors<TValues>) => Errors<TValues>)) => void
type SetTouched<TValues> = (e: Partial<Errors<TValues>> | ((e: Touched<TValues>) => Touched<TValues>)) => void
type Reset = (name?: string) => void

type UseForm<TForm extends TypeForm> = [
   {
      values: TValues<TForm>,
      errors: Errors<TValues<TForm>>,
      touched: Touched<TValues<TForm>>
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

   const [state, setState] = React.useReducer(reducer, form.get)
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
         setRefValue(listInputsRef.current[key], form.getValues[key])
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
      } else if (!complementProps.type) {
         return customWeb(complementProps)
      }
      return defaultInputBase(complementProps)
   }

   function defaultInputBase(complementProps: InputProps) {
      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
         form.onChange = {
            path: e.target.name,
            value: complementProps.type === 'number'
               ? Number(e.target.value)
               : complementProps.type === 'date'
                  ? e.target.value
                  : complementProps.type === 'file'
                     ? e.target.files
                     : e.target.value,
         }
      }

      function onBlur() {
         form.setTouched = { [complementProps.name]: true }
      }

      const props = registerInput({
         defaultValue: form.getValues[complementProps.name],
         onChange,
         onBlur,
         ...complementProps,
      })

      return props
   }

   function checkedBase(complementProps: InputProps) {
      function onChange(e: React.ChangeEvent<HTMLInputElement>) {
         form.setValues = {
            [e.target.name]: complementProps.type === 'radio' ? e.target.value : e.target.checked,
         }
      }

      function onBlur() {
         form.setTouched = { [complementProps.name]: true }
      }

      const props = registerInput({
         defaultChecked:
            complementProps.type === 'radio'
               ? form.getValues[complementProps.name] === complementProps.value
               : form.getValues[complementProps.name],
         onChange,
         onBlur,
         ...complementProps,
      })
      return props
   }

   /**
    * 
    * @param param this is object with properties of a custom input web.
    * custom function register a custom inputs like a react date piker or react-select.
    */
   function customWeb<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
      const complementProps: any = typeof param === 'string' ? { name: param } : { ...param }

      function onChange(e: any) {
         form.onChange = {
            path: complementProps.name,
            value: e
         }
      }

      function onBlur() {
         form.setTouched = { [complementProps.name]: true }
      }

      /**
       * set a type custom to filter a custom inputs in complex forms.
       */
      const props = registerInput({
         value: form.getValues[complementProps.name] || null,
         onChange,
         onBlur,
         type: 'custom',
         ...complementProps,
      })

      return props
   }


   function onSubmit(fn: (values: TValues<TForm>) => void) {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         if (!options.debounce && !options.isControlled) {
            setState(form.get)
         }
         fn(form.getValues)
      }
   }

   function setValues(resolve: Partial<TValues<TForm>> | ((e: TValues<TForm>) => TValues<TForm>)) {
      if (typeof resolve === 'function') {
         form.setValues = resolve(form.getValues)
      }
      form.setValues = resolve
      setRefInputsValues()
   }

   function setErrors(resolve: Partial<Errors<TValues<TForm>>> | ((e: Errors<TValues<TForm>>) => Errors<TValues<TForm>>)) {
      if (typeof resolve === 'function') {
         form.setErrors = resolve(form.getErrors)
      }
      form.setErrors = resolve
   }

   function setTouched(resolve: Partial<Touched<TValues<TForm>>> | ((e: Touched<TValues<TForm>>) => Touched<TValues<TForm>>)) {
      if (typeof resolve === 'function') {
         form.setTouched = resolve(form.getTouched)
      }
      form.setTouched = resolve
   }

   const hasCustomInputs = React.useCallback(() => {
      return Object.keys(listInputsRef.current)
         .filter((ref) => listInputsRef.current[ref].type === 'custom')
         .map((field) => listInputsRef.current[field].name)
   }, [])

   function reset(path?: string) {
      form.reset(path)
      setRefInputsValues()
      if (!options.debounce && !options.isControlled || hasCustomInputs()) {
         setState(form.get)
      }
   }

   React.useEffect(() => {
      const subscriber = form.subscribe(e => {
         options.watch?.(e)
         if (options.isControlled || hasCustomInputs()) {
            setState(e)
         } else if (options.debounce || hasCustomInputs()) {
            setValuesDebounce(e)
         }
      })

      return () => {
         subscriber()
      }
   }, [options])

   return [state, { onSubmit, input, setValues, reset, setErrors, setTouched }]
}
