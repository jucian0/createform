import { ValidationError, Schema as YupSchema } from "yup"
import dot from 'dot-prop-immutable'

export function validation<TValues extends {}, Schema extends YupSchema<TValues>>(values: TValues, schema: Schema, callback: (errors: any) => void) {

   schema?.validate(values, { abortEarly: false })
      .then(() => {
         callback({})
      })
      .catch((e: ValidationError) => {
         let errors = {}
         e.inner.forEach(key => {
            const path = key.path
               .split('[')
               .join('.')
               .split(']')
               .join('')

            errors = dot.set(errors, path, key.message)
         })
         callback(errors)
      })

}
