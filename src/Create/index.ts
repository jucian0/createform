import { FieldBuilder } from '../FieldBuilder'
import { FormValuesState } from '../FormValuesState'

function getFieldsValues(fields: object) {
   function getDeepValue(obj: object, path: string): any {
      const value = obj[path]?.defaultValue ? obj[path].defaultValue : obj[path]

      if (typeof value === 'object') {
         const keys = Object.keys(value)
         const newObj = {}
         keys.forEach(key => {
            newObj[key] = getDeepValue(value, key)
         })

         return newObj
      }

      return value
   }

   const defaultState = Object.keys(fields).reduce((acc, key) => {
      const value = getDeepValue(fields, key)

      return {
         ...acc,
         [key]: value
      }
   }, {})

   return defaultState
}

export function create(fn: Function) {
   const builder = new FieldBuilder()

   return () => {
      const fields = fn(builder)

      const defaultState = getFieldsValues(fields)

      const state = new FormValuesState(defaultState)

      return {
         refs: fields,
         state: state.getFormValues()
      }
   }
}
