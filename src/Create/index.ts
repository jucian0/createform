import { useEffect } from 'react'
import { FieldBuilder } from '../FieldBuilder'
import { FormValuesState } from '../FormValuesState'
import { get } from './../ObjectPath'

// class Create {
//   private fields: {} = {}
//   constructor(
//     private readonly fieldBuilder: FieldBuilder,
//     private readonly formState: FormValuesState,
//     private readonly objectPath: ObjectPath
//   ) {}

//   public create(fn: Function) {
//     this.fields = fn(this.fieldBuilder)
//     const defaultValue = this.objectPath.getFieldsProperty(
//       this.fields,
//       'defaultValue'
//     )

//     this.formState.setFormValue(defaultValue)
//   }

//   public getValues() {
//     return this.formState.getFormValues()
//   }

//   public getRefs() {
//     return this.fields
//   }
// }

// export function creates(fn: Function) {
//   const fieldBuilder = new FieldBuilder()
//   const formState = new FormValuesState()
//   const objectPath = new ObjectPath()
//   const form = new Create(fieldBuilder, formState, objectPath)
//   return () => {
//     form.create(fn)

//     return {
//       refs: form.getRefs(),
//       state: form.getValues()
//     }
//   }
// }

export function create(fn: Function) {
   const builder = new FieldBuilder()
   const state = new FormValuesState({})

   return () => {
      const fields = fn(builder)

      function register(name: string) {
         const field = get(fields, name)

         console.log(field, name)

         function onChange(value: any) {
            state.setFieldValue(name, value.target.value)
         }

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', onChange)
            }

            return () => {
               field.ref.current.removeEventListener('input', onChange)
            }
         }, [field?.current])

         return field
      }

      return {
         state: state.getFormValues(),
         register
      }
   }
}
