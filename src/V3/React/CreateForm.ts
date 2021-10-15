import { useEffect, useReducer } from 'react'
import { isCheckbox, isParsableToNumber } from './Utils'
import { get } from '../StateManagement/ObjectPath'
import { FormValuesState } from '../StateManagement/FormValuesState'
import { Validate } from '../Validation/Validate'
import { CreateField, FieldType } from './CreateField'
import { FormErrorsState } from '../StateManagement/FormErrorsState'
import { FormTouchedState } from '../StateManagement/FormTouchedState'
import { FormPristineState } from '../StateManagement/FormPristineState'

type Options = {
   mode: 'onBlur' | 'onChange' | 'onSubmit'
   validateOn?: 'onBlur' | 'onChange' | 'onSubmit'
}

type Action = {
   type: 'touched' | 'errors' | 'values' | 'pristine'
   payload: any
}

function stateReducer(state: FormValuesState, action: Action) {
   return {
      ...state,
      [action.type]: action.payload
   }
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
export function create(fn: Function) {
   return (options?: Options) => {
      const values = new FormValuesState({})
      const validate = new Validate()
      const errors = new FormErrorsState({})
      const touched = new FormTouchedState({})
      const pristine = new FormPristineState({})
      const fields = fn(CreateField)
      const [formState, setFormState] = useReducer(stateReducer, {})

      function register(name: string, type?: FieldType) {
         const { validations, ...field } = get(fields, name)

         function handleOnChange(event: any) {
            if (isCheckbox(field.type)) {
               return values.setFieldValue(name, event.target.checked)
            }
            const value = isParsableToNumber(event.target.value)
               ? parseInt(event.target.value, 10)
               : event.target.value

            return values.setFieldValue(name, value)
         }

         function handleValidate(event: any) {
            errors.setFieldError(
               name,
               validate.validate(event.target.value, validations)
            )
         }

         function handleTouched() {
            touched.setFieldTouched(name, true)
         }

         function inputEventHandler(event: any) {
            if (options?.mode === 'onChange') {
               handleOnChange(event)
               handleValidate(event)
            }
         }

         function blurEventHandler(event: any) {
            if (options?.mode === 'onBlur') {
               handleOnChange(event)
               handleValidate(event)
               handleTouched()
            }
         }

         function focusEventHandler() {
            pristine.setFieldPristine(name)
         }

         function submitEventHandler(event: any) {
            if (options?.mode === 'onSubmit') {
               handleOnChange(event)
               handleValidate(event)
            }
         }

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('focus', focusEventHandler)
            }
         }, [field.ref])

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', inputEventHandler)
               field.ref.current.addEventListener('blur', blurEventHandler)
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
         }, [field.ref])

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
         }, [field.ref])

         return { ...field, name }
      }

      function handleState(event: any) {
         return (state: any) => setFormState({ payload: state, type: event })
      }

      useEffect(() => {
         const valuesUnsubscribe = values.subscribe(handleState('values'))
         const errorsUnsubscribe = errors.subscribe(handleState('errors'))
         const touchedUnsubscribe = touched.subscribe(handleState('touched'))
         const pristineUnsubscribe = pristine.subscribe(handleState('pristine'))

         return () => {
            valuesUnsubscribe()
            errorsUnsubscribe()
            touchedUnsubscribe()
            pristineUnsubscribe()
         }
      }, [])

      return {
         state: formState,
         register
      }
   }
}
