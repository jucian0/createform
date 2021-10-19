import { useCallback, useEffect, useRef, useState } from 'react'
import { isCheckboxOrRadio, isParsableToNumber } from './Utils'
import { get } from '../StateManagement/ObjectPath'
import { FormState } from '../StateManagement/FormState'
import { Validate } from '../Validation/Validate'
import { CreateField, FieldType } from './CreateField'
import { set } from 'object-path-immutable'

type Options = {
   mode: 'onBlur' | 'onChange' | 'onSubmit'
   validateOn?: 'onBlur' | 'onChange' | 'onSubmit'
}

/**
 * CREATE FORM
 *
 * @param {Function} function - This function receives a `CreateField` function as a parameter, and returns a custom hook.
 * @example const useForm = create(register => ({
 *    name: register('') }),
 *    email => ({ email: register('')
 * })) `or`
 *
 * const useForm = create(register => ({
 *    name: register(['', required('This field is required'),...more validators]),
 *    email: register(['', required('This field is required',...more validators)])
 * }))
 */

const INITIAL_VALUES = {
   values: {},
   errors: {},
   touched: {}
}
export function create(fn: Function) {
   return (options?: Options) => {
      const form$ = new FormState(INITIAL_VALUES)
      const validate = new Validate()
      const fields = useRef(fn(CreateField))
      const [formState, setFormState] = useState(form$.getFormState())

      const register = useCallback((name: string, type?: FieldType) => {
         const { validations, ...field } = get(fields.current, name)

         function handleOnChange(event: any) {
            if (isCheckboxOrRadio(field.type)) {
               return form$.setFieldValue(name, event.target.checked)
            }
            const value = isParsableToNumber(event.target.value)
               ? parseInt(event.target.value, 10)
               : event.target.value

            return form$.setFieldValue(name, value)
         }

         function handleNextState(event: any) {
            const error = validate.validate(event.target.value, validations)
            const value = isCheckboxOrRadio(type as '')
               ? event.target.checked
               : isParsableToNumber(event.target.value)
               ? parseInt(event.target.value, 10)
               : event.target.value
            const touched = true

            const currentState = form$.get()
            const nextErrors = set(currentState, `errors.${name}`, error).errors
            const nextValues = set(currentState, `values.${name}`, value).values
            const nextTouched = set(
               currentState,
               `touched.${name}`,
               touched
            ).touched

            const nextState = {
               values: nextValues,
               errors: nextErrors,
               touched: nextTouched
            }

            form$.set(nextState)
         }

         function inputEventHandler(event: any) {
            if (options?.mode === 'onChange') {
               handleNextState(event)
            }
         }

         function blurEventHandler(event: any) {
            if (options?.mode === 'onBlur') {
               handleNextState(event)
            }
         }

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', inputEventHandler)
               field.ref.current.addEventListener('blur', blurEventHandler)
               form$.setFieldValue(name, field.currentValue)
            }

            return () => {
               if (field.ref.current) {
                  field.ref.current.removeEventListener(
                     'input',
                     inputEventHandler
                  )
                  field.ref.current.removeEventListener(
                     'blur',
                     blurEventHandler
                  )
               }
            }
         }, [field.ref.current])

         useEffect(() => {
            if (field.ref.current && type === 'radio') {
               Array.from(
                  (field.ref.current as HTMLDivElement).getElementsByTagName(
                     'input'
                  )
               ).forEach((radio: any) => {
                  radio.checked = radio.value == field.defaultChecked
               })
            }
         }, [field.ref.current])

         return { ...field, name, type }
      }, [])

      const handleState = useCallback((state: any) => {
         return setFormState({ ...state })
      }, [])

      useEffect(() => {
         const valuesUnsubscribe = form$.subscribe(handleState)

         return () => {
            valuesUnsubscribe()
         }
      }, [handleState])

      function setFieldValue(name: string, value: any) {
         form$.setFieldValue(name, value)
         const field = get(fields.current, name)
         field.ref.current.value = value
      }

      function resetFieldValue(name: string) {
         form$.resetFieldValue(name)
         const field = get(fields.current, name)
         field.ref.current.value = field.defaultValue
      }

      return {
         state: formState,
         register,
         form$: {
            setFieldValue,
            resetFieldValue
         }
      }
   }
}
