import { useEffect, useCallback, useState } from "react"
import { ValidationError, Schema as YupSchema } from "yup"
import dot from 'dot-prop-immutable'

const useValidation = <TValues extends {}, Schema extends YupSchema<TValues>>(values: TValues, schema?: Schema) => {
   const [errors, setErrors] = useState<TValues>({} as TValues)

   const validate = useCallback(() => {

      schema?.validate(values, { abortEarly: false })
         .then(() => {
            setErrors({} as TValues)
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
            setErrors({ ...errors } as TValues)
         })

   }, [schema, values])

   useEffect(() => {
      validate()
   }, [validate])



   return { errors, isValid: Object.keys(errors).length === 0 }
}

export { useValidation }