import React from 'react'
import { boolean, required, Validator } from '../Validation/Validators'

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

type Fields = {
   [key: string]:
      | [DefaultValue, ...Validator[]]
      | DefaultValue
      | FormControl<any>
}

export class FormControl<Form extends Fields> {
   constructor(public form: Form) {
      Object.keys(form).forEach(key => {
         this[key] = this.field(form[key] as '', key)
      })
   }

   private boolean(key: string, value: boolean, validations?: Validator[]) {
      const ref = React.createRef<any>()

      return {
         props: {
            ref,
            name: key,
            defaultChecked: value
         },
         meta: {
            path: key,
            validations
         }
      }
   }

   private default<T>(key: string, value: T, validations?: Validator[]) {
      const ref = React.createRef<any>()

      return {
         props: {
            ref,
            name: key,
            defaultValue: value
         },
         meta: {
            path: key,
            validations
         }
      }
   }

   private field(
      params: [DefaultValue, ...Validator[]] | DefaultValue,
      key: string
   ) {
      const value = Array.isArray(params) ? params[0] : params
      const validations = Array.isArray(params)
         ? (params.slice(1) as Validator[])
         : ([] as Validator[])

      if (params instanceof FormControl) {
         return params
      }

      if (typeof value === 'boolean') {
         return this.boolean(key, value, validations)
      }

      return this.default(key, value, validations)
   }
}

export function useForm<T extends Fields>(formControl: FormControl<T>) {
   return { formControl }
}
