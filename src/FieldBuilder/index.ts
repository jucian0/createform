import React from 'react'

type InputRef<T> = React.RefObject<T>

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

export class FieldBuilder {
   private ref: InputRef<any>
   private name: string
   private type: FieldType
   private validationsList: any[]

   constructor() {}

   public text(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'text'

      return this
   }

   public password(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'password'

      return this
   }

   public number(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'number'

      return this
   }

   public email(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'email'

      return this
   }

   public select(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'select'

      return this
   }

   public checkbox(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'checkbox'

      return this
   }

   public radio(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'radio'

      return this
   }

   public color(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'color'

      return this
   }

   public date(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'date'

      return this
   }

   public file(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'file'

      return this
   }

   public hidden(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'hidden'

      return this
   }

   public image(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'image'

      return this
   }

   public range(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'range'

      return this
   }

   public tel(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'tel'

      return this
   }

   public url(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'url'

      return this
   }

   public time(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'time'

      return this
   }

   public dateTime(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'datetime-local'

      return this
   }

   public month(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'month'

      return this
   }

   public submit(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'submit'

      return this
   }

   public reset(name: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'reset'

      return this
   }

   public custom(name: string, type: string) {
      this.ref = React.createRef()
      this.name = name
      this.type = 'custom'

      return this
   }

   public validations(validations: Array<any>) {
      this.validationsList = validations

      return this
   }

   public build(defaultValue: any) {
      return {
         ref: this.ref,
         name: this.name,
         type: this.type,
         defaultValue,
         validations: this.validationsList
      }
   }
}
