import { Schema, ValidationError } from 'yup'
import * as Dot from './ObjectUtils'

export function makeDotNotation(str: string) {
   return str.split('[').join('.').split(']').join('')
}

export function validate<TValues extends {}>(
   values: TValues,
   validationSchema: Schema<TValues>
) {
   return validationSchema
      ?.validate(values, { abortEarly: false })
      .then(() => {
         return {}
      })
      .catch((e: ValidationError) => {
         throw e.inner.reduce((acc, key) => {
            const path = makeDotNotation(key.path)
            return Dot.set(acc, path, key.message)
         }, {})
      })
}
