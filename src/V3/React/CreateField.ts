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

export class FormControl {
   constructor(form: {
      [key: string]: [DefaultValue, ...Validator[]] | DefaultValue
   }) {
      Object.keys(form).forEach(key => {
         this[key] = this.createField(form[key])
      })
   }

   private createField(params: [DefaultValue, ...Validator[]] | DefaultValue) {
      const value = Array.isArray(params) ? params[0] : params
      const validations = Array.isArray(params)
         ? params.slice(1)
         : ([] as Validator[])

      const ref = React.createRef<any>()
      return {
         ref,
         defaultChecked: Boolean(value),
         defaultValue: value,
         validations: validations as Validator[]
      }
   }
}

export function create(fn: Function) {
   return (...args: any[]) => {
      const form = new FormControl(fn(...args))
      return form
   }
}
