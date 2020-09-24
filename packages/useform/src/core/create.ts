import { Observable } from "./observable"
import dot from 'dot-prop-immutable'
import { validation } from "./validation"


export interface ObservableData<T extends Options<T>> {
   values: T['initialValues'],
   errors: T['initialValues'],
   touched: T['initialValues']
}
export interface Options<T extends {}> {
   initialValues?: T
   schemaValidation?: any
}

class Create<T extends Options<T>> extends Observable<ObservableData<T>>{

   private initialState: Omit<T, 'schemaValidation'> = Object.assign({})
   private schemaValidation;

   constructor(state: T) {
      super({
         values: state.initialValues,
         errors: {} as any,
         touched: {} as any,
      })

      this.initialState = {
         initialValues: state.initialValues,
      } as T

      validation(this.getValues, state.schemaValidation, e => this.setErrors = e)

      this.schemaValidation = state.schemaValidation
   }

   get getValues() {
      return this.get.values
   }

   get getErrors() {
      return this.get.errors
   }

   get getTouched() {
      return this.get.touched
   }

   set setValues(values: Partial<ObservableData<T>["values"]>) {
      this.set = dot.set(this.get, `values`, { ...this.getValues, ...values })
   }

   set onChange(e: any) {
      const values = dot.set(this.getValues, e.path, e.value)
      const touched = dot.set(this.getTouched, e.path, true)
      if (this.schemaValidation) {
         validation(values, this.schemaValidation, errors => {
            this.set = {
               values,
               errors,
               touched
            }
         })
      } else {
         this.set = dot.set(this.get, `values`, values)
      }
   }

   set setErrors(errors: Partial<ObservableData<T>["errors"]>) {
      this.set = dot.set(this.get, `errors`, errors)
   }

   set setTouched(touched: Partial<ObservableData<T>["touched"]>) {
      this.set = dot.set(this.get, `touched`, { ...this.getTouched, ...touched })
   }

   reset(path?: string) {
      if (path && typeof path === "string") {
         this.set = {
            values: dot.set(this.getValues, path, this.initialState.initialValues[path] || null),
            touched: dot.set(this.getTouched, path, false),
            errors: dot.set(this.getErrors, path, ''),
         }
      } else {
         this.set = {
            values: this.initialState.initialValues,
            touched: {} as any,
            errors: this.getErrors
         }
         validation(this.getValues, this.schemaValidation, e => this.setErrors = e)
      }
   }

}

export const create = <T>(state: Options<T> = {} as Options<T>) => new Create(state)