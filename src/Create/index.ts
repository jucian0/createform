import { FieldBuilder } from '../FieldBuilder'
import { FormValuesState } from '../FormValuesState'
import { ObjectPath } from '../ObjectPath'

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
   const objectPath = new ObjectPath()

   return () => {
      const fields = fn(builder)

      const defaultValues = objectPath.getFieldsProperty(fields, 'defaultValue')

      const state = new FormValuesState(defaultValues)

      function register(name: string) {}

      return {
         refs: fields,
         state: state.getFormValues()
      }
   }
}
