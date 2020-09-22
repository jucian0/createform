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
      if (this.schemaValidation) {
         validation(this.getValues, this.schemaValidation, e => this.setErrors = e)
      }
   }

   set setErrors(errors: Partial<ObservableData<T>["errors"]>) {
      this.set = dot.set(this.get, `errors`, errors)
   }

   set setTouched(touched: Partial<ObservableData<T>["touched"]>) {
      this.set = dot.set(this.get, `touched`, { ...this.getTouched, ...touched })
   }

   reset() {
      this.set = {
         values: this.initialState,
         touched: {}
      }
      validation(this.getValues, this.schemaValidation, e => this.setErrors = e)


      console.log(this.getErrors)
   }

}

export const create = <T>(state: Options<T> = {} as Options<T>) => new Create(state)