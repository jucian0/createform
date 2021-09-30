import React from 'react'

type InputRef<T> = React.RefObject<T>

export class FormBuilder {
   private ref: InputRef<any>
   private name: string

   constructor() {}

   public text(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public password(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public number(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public email(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public select(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public checkbox(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public radio(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public color(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public date(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public file(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public hidden(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public image(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public range(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public tel(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public url(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public time(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public datetime(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public month(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public submit(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public reset(name: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public custom(name: string, type: string) {
      this.ref = React.createRef()
      this.name = name

      return this
   }

   public validations(name: string, validations: any) {
      this.ref = React.createRef()
      return this
   }

   public build(inintialValue: any) {
      return {
         ref: this.ref,
         name: this.name
      }
   }
}
