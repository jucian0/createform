import { InitialErrors, InitialTouched, Observable } from "./observable"
import dot from 'dot-prop-immutable'
import { ValidationError, Schema as YupSchema } from "yup"
import { validation } from "./validation"

export interface ObservableData<T extends Options<T>> {
   values: T['initialValues'],
   errors: T['initialErrors'],
   touched: T['initialTouched']
}
export interface Options<T extends {}> {
   initialValues?: T
   initialErrors?: InitialErrors<T>
   initialTouched?: InitialTouched<T>
   schemaValidation?: any
}

//<TypeContext extends Context<TypeContext['state']>>
class Create<T extends Options<T['initialValues']>> extends Observable<ObservableData<T>>{

   private initialState: Options<T> = Object.assign({})
   private schemaValidation

   constructor(state: T) {
      super({
         values: state.initialValues,
         errors: state.initialErrors,
         touched: state.initialTouched,
      })
      this.initialState = state
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

   set setErrors(errors: Partial<ObservableData<T>["errors"]>) {
      this.set = dot.set(this.get, `errors`, { ...this.getErrors, ...errors })
   }

   set setTouched(touched: Partial<ObservableData<T>["touched"]>) {
      this.set = dot.set(this.get, `touched`, { ...this.getTouched, ...touched })
   }

   reset() {
      this.set = {
         values: this.initialState.initialValues,
         errors: this.initialState.initialErrors,
         touched: this.initialState.initialTouched
      }
   }

}

export const create = <T extends Options<T>>(state: T) => new Create(state)