import { useEffect } from 'react'
import { Field } from '../FieldBuilder'
import { FormValuesState } from '../FormValuesState'
import { Validate } from '../Validate'
import { get } from './../ObjectPath'

function isCheckbox(type: string) {
   return type === 'checkbox'
}

function isParsableToNumber(value: string) {
   return !isNaN(parseInt(value, 10))
}

export function create(fn: Function) {
   const state = new FormValuesState({})
   const validate = new Validate()

   return () => {
      const fields = fn(Field)

      function register(name: string) {
         const field = get(fields, name)

         function onChange(event: any) {
            if (isCheckbox(field.type)) {
               return state.setFieldValue(name, event.target.checked)
            }
            const value = isParsableToNumber(event.target.value)
               ? parseInt(event.target.value, 10)
               : event.target.value

            return state.setFieldValue(name, value)
         }

         function handleValidate(event: any) {
            console.log(
               validate.validate(event.target.value, field.validations)
            )
         }

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', (e: any) => {
                  onChange(e)
                  handleValidate(e)
               })
            }

            return () => {
               field.ref.current.removeEventListener('input', (e: any) => {
                  onChange(e)
                  handleValidate(e)
               })
            }
         }, [field.ref])

         useEffect(() => {
            if (field.ref.current && field.type === 'radio') {
               Array.from(
                  (field.ref.current as HTMLDivElement).getElementsByTagName(
                     'input'
                  )
               ).forEach((radio: any) => {
                  radio.checked = radio.value == field.defaultChecked
               })
            }
         }, [field.ref])

         return field
      }

      return {
         state: state.getFormValues(),
         register
      }
   }
}
