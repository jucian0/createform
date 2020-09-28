import React from 'react'
import dot from 'dot-prop-immutable'
import { InputPartialProps, InputRegisterProps, ListInputsRef, RefFieldElement, TypeForm } from '..'
import { deepComparative } from '../utils'

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
   function registerWeb<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
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

   /**
   * 
   * @param param this is object with properties of a custom input native.
   * custom function register a custom inputs like a Switch Picker.
   */
   function registerNative<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
      const complementProps: any = typeof param === 'string' ? { name: param } : { ...param }

      function onValueChange(e: any) {
         form.onChange = {
            path: complementProps.name,
            value: e,
         }
      }

      /**
       * set a type custom to filter a custom inputs in complex forms.
       */
      const props = registerInput({
         value: dot.get(form.getValues, complementProps.name),
         onValueChange,
         type: 'custom',
         ...complementProps,
      })

      return props
   }

   function register<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
      if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
         return registerNative(param)
      }
      return registerWeb(param)
   }

   function compareChanges<T>(first: T, second: T) {
      return Object.keys(listInputsRef.current).some(key => {
         return deepComparative(dot.get(first, key), dot.get(second, key)).isEqual()
      })
   }

   React.useEffect(() => {
      const subscriber = form.subscribe(e => {
         if (compareChanges(state, e.values)) {
            setState(e.values)
         }
      })

      return subscriber
   }, [])

   return register
}