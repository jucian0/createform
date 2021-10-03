import { FieldBuilder } from '../FieldBuilder'
import { FormValuesState } from '../FormValuesState'

export function create(fn: Function) {
   const builder = new FieldBuilder()

   return () => {
      const fields = fn(builder)

      const defaultState = Object.keys(fields).reduce((acc, key) => {
         return {
            ...acc,
            [key]: fields[key].defaultValue
         }
      }, {})

      const state = new FormValuesState(defaultState)

      return {
         refs: fields,
         state
      }
   }
}
