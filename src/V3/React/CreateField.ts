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
   constructor() {}

   build(form: {
      [key: string]: [DefaultValue, ...Validator[]] | DefaultValue
   }) {
      Object.keys(form).forEach(key => {
         this[key] = this.createField(form[key], key)
      })

      return this
   }

   private createField(
      params: [DefaultValue, ...Validator[]] | DefaultValue,
      key: string
   ) {
      const value = Array.isArray(params) ? params[0] : params
      const validations = Array.isArray(params)
         ? params.slice(1)
         : ([] as Validator[])

      const ref = React.createRef<any>()
      return {
         props: {
            ref,
            name: key,
            defaultChecked: Boolean(value),
            defaultValue: value
         },
         meta: {
            path: key,
            validations: validations as Validator[]
         }
      }
   }
}

export function creates(fn: Function) {
   return (...args: any[]) => {
      const formControl = new FormControl()
      const form = fn(formControl, ...args)
      return form
   }
}
