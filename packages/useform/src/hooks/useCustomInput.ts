import React from 'react'
import dot from 'dot-prop-immutable'
import { InputPartialProps, InputRegisterProps, ListInputsRef, RefFieldElement, TypeForm } from '..'
import { useStateCallback } from './useStateCallback'

export function useCustomInput<TForm extends TypeForm>(form: TForm) {
   const [state, setState] = useStateCallback<TForm['get']['values']>({}, e => form.setValues = e)
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
         setState(state => dot.set(state, complementProps.name, e))
         // form.onChange = {
         //    path: complementProps.name,
         //    value: e
         // }
      }

      /**
       * set a type custom to filter a custom inputs in complex forms.
       */
      const props = registerInput({
         value: dot.get(state, complementProps.name) || null,
         onChange,
         type: 'custom',
         ...complementProps,
      })

      return props
   }


   return register


}