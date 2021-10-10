import React from 'react'
import { Validator } from '../Validation/Validators'

export type FieldType =
   | 'text'
   | 'number'
   | 'email'
   | 'password'
   | 'date'
   | 'time'
   | 'datetime-local'
   | 'month'
   | 'week'
   | 'url'
   | 'search'
   | 'tel'
   | 'color'
   | 'file'
   | 'range'
   | 'checkbox'
   | 'radio'
   | 'select'
   | 'textarea'
   | 'hidden'
   | 'submit'
   | 'reset'
   | 'custom'
   | 'image'

type FieldProperties = {
   ref: React.Ref<any>
   defaultValue: any
   defaultChecked: boolean
   validations?: Array<Validator>
}

type DefaultValue = string | number | boolean | null

/**
 * CREATE FIELD
 *
 * This function creates a field properties.
 * @param Array<string, Functions> | string
 * @returns field propers  - Field properties.
 */
export function CreateField<T = any>(
   params: [DefaultValue, ...Validator[]] | DefaultValue
): FieldProperties {
   const value = Array.isArray(params) ? params[0] : params
   const validations = Array.isArray(params)
      ? params.slice(1)
      : ([] as Validator[])

   const ref = React.createRef<T>()
   return {
      ref,
      defaultChecked: Boolean(value),
      defaultValue: value,
      validations: validations as Validator[]
   }
}
