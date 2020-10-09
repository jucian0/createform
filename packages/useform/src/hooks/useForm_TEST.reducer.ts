
export type Action = {
   type: 'error' | 'input' | 'blur' | 'isValid',
   payload: any
}

export type BaseState<T> = {
   error: T,
   values: T,
   touched: T,
   isValid: boolean
}


export function useFormTestReducer<T extends BaseState<T['values']>>(state: T, action: Action): BaseState<T['values']> {
   switch (action.type) {
      case 'error':
         return {
            ...state,
            error: action.payload
         }

      case 'input':
         return {
            ...state,
            values: {
               ...state.values,
               ...action.payload
            }
         }

      case 'blur':
         return {
            ...state,
            touched: {
               ...state.touched,
               ...action.payload
            }
         }

      case 'isValid':
         return {
            ...state,
            isValid: action.payload
         }

      default:
         return state
   }
}