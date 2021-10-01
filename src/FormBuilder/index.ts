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

   constructor(values: FormShape) {
      this.values = values
   }

   public getValues(): FormShape {
      return this.values
   }

   public getErrors(): FormShape {
      return this.errors
   }

   public getUntouched(): FormShape {
      return this.untouched
   }

   public getTouched(): FormShape {
      return this.touched
   }

   public getPristine(): FormShape {
      return this.pristine
   }

   public getDirty(): FormShape {
      return this.dirty
   }
}
