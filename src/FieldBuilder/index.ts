import React from 'react'

type FieldType =
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

export function Field<T = any>([value, ...validations]: Array<any>) {
   const ref = React.createRef<T>()
   return {
      ref,
      defaultChecked: value,
      defaultValue: value,
      validations: validations
   }
}
