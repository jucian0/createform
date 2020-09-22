import { Observable } from "./observable"
import dot from 'dot-prop-immutable'
import { validation } from "./validation"


export interface ObservableData<T extends Options<T>> {
   values: T['initialValues'],
   errors: T['initialErrors'],
   touched: T['initialTouched']
}
export interface Options<T extends {}> {
   initialValues?: T
   initialErrors?: any
   initialTouched?: any
   schemaValidation?: any
}

class Create<T extends Options<T>> extends Observable<ObservableData<T>>{

   private initialState: Omit<T, 'schemaValidation'> = Object.assign({})
   private schemaValidation;

   constructor(state: T) {
      super({
         values: state.initialValues,
         errors: state.initialErrors,
         touched: state.initialTouched,
      })

      this.initialState = {
         initialValues: state.initialValues,
         initialErrors: state.initialErrors,
         initialTouched: state.initialTouched
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
         values: this.initialState.initialValues,
         errors: this.initialState.initialErrors,
         touched: this.initialState.initialTouched
      }
      validation(this.getValues, this.schemaValidation, e => this.setErrors = e)
   }

}

export const create = <T>(state: Options<T> = {} as Options<T>) => new Create(state)