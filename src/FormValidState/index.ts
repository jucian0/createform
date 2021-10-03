export class FormValidState<T = any> extends ObservableForm<T> {
   private initialState: T
   constructor(defaultState: T) {
      super(defaultState)
      this.initialState = defaultState
   }

   getInitialState() {
      return this.initialState
   }

   getFieldsValid() {
      return this.get()
   }

   getFieldValid(field: string) {
      return this.get()[field]
   }
}
