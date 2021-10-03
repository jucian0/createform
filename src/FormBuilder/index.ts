import { FieldBuilder } from '../FieldBuilder'
import { FormValuesState } from '../FormValuesState'

type FormShape = {
   [key: string]: any
}

export class FormBuilder {
   private values: FormShape
   private errors: FormShape
   private untouched: FormShape
   private touched: FormShape
   private pristine: FormShape
   private dirty: FormShape

   constructor(
      private readonly fields: FieldBuilder,
      private readonly formValues: FormValuesState
   ) {
      this.values = formValues.getFormValues()
   }

   public getValues(): FormShape {
      return this.values
   }

   //   public getErrors(): FormShape {
   //     return this.errors
   //   }

   //   public getUntouched(): FormShape {
   //     return this.untouched
   //   }

   //   public getTouched(): FormShape {
   //     return this.touched
   //   }

   //   public getPristine(): FormShape {
   //     return this.pristine
   //   }

   //   public getDirty(): FormShape {
   //     return this.dirty
   //   }
}
