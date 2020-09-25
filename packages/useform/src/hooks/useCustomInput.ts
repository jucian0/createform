import React from 'react'
import dot from 'dot-prop-immutable'
import { InputPartialProps, InputRegisterProps, ListInputsRef, RefFieldElement, TypeForm } from '..'

export function useCustomInput<TForm extends TypeForm>(form: TForm) {
   const [state, setState] = React.useState<TForm['get']['values']>(form.getValues)
   const listInputsRef = React.useRef<ListInputsRef>(Object.assign({}))

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
   * @param param this is object with properties of a custom input web.
   * custom function register a custom inputs like a react date piker or react-select.
   */
   function register<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
      const complementProps: any = typeof param === 'string' ? { name: param } : { ...param }

      function onChange(e: any) {
         form.onChange = {
            path: complementProps.name,
            value: e
         }
      }

      /**
       * set a type custom to filter a custom inputs in complex forms.
       */
      const props = registerInput({
         value: dot.get(form.getValues, complementProps.name) || null,
         onChange,
         type: 'custom',
         ...complementProps,
      })

      return props
   }

   React.useEffect(() => {
      const subscriber = form.subscribe(e => {

         const isAllowedUpdate = Object.keys(listInputsRef.current).some(key => {
            const firstValue = dot.get(state, key)
            const secondValue = dot.get(form.getValues, key)
            if (typeof firstValue === 'object') {
               return JSON.stringify(firstValue) !== JSON.stringify(secondValue)
            }
            return String(firstValue) !== String(secondValue)
         })

         if (isAllowedUpdate) {
            setState(e.values)
         }
      })

      return subscriber
   }, [])


   return register
}