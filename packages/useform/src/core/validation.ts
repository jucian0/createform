import { ValidationError, Schema as YupSchema } from "yup"
import dot from 'dot-prop-immutable'

export function validation<TValues extends {}>(values: TValues, schema: any) {

   let errors = {}

   schema?.validate(values, { abortEarly: false })
      .then(() => {
         errors = {}
      })
      .catch((e: ValidationError) => {
         //let errors = {}
         e.inner.forEach(key => {
            const path = key.path
               .split('[')
               .join('.')
               .split(']')
               .join('')

            errors = dot.set(errors, path, key.message)
         })
         // setErrors({ ...errors } as TValues)
      })

   return errors as TValues
}
