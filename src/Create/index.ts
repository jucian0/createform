import { useEffect } from 'react'
import { FieldBuilder } from '../FieldBuilder'
import { FormErrorsState } from '../FormErrorsState'
import { FormValuesState } from '../FormValuesState'
import { get } from './../ObjectPath'

function isCheckbox(type: string) {
   return type === 'checkbox'
}

function isParsableToNumber(value: string) {
   return !isNaN(parseInt(value, 10))
}

export function create(fn: Function) {
   const builder = new FieldBuilder()
   const state = new FormValuesState({})
   //const errors = new FormErrorsState({})

   return () => {
      const fields = fn(builder)

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

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', onChange)
            }

            return () => {
               field.ref.current.removeEventListener('input', onChange)
            }
         }, [field?.current])

         useEffect(() => {
            if (field.type === 'radio') {
               Array.from(
                  (field.ref.current as HTMLDivElement).getElementsByTagName(
                     'input'
                  )
               ).forEach((radio: any) => {
                  radio.checked = radio.value == field.defaultChecked
               })
            }
         }, [field.ref.current])

         return field
      }

      return {
         state: state.getFormValues(),
         register
      }
   }
}
