
export type Action = {
   type: 'error' | 'input' | 'blur',
   payload: any
}

export type BaseState<T> = {
   error: T,
   values: T,
   touched: T
}


export function useFormTestReducer<T extends BaseState<T['values']>>(state: T, action: Action): BaseState<T['values']> {
   switch (action.type) {
      case 'error':
         return {
            ...state,
            error: {
               ...state.error,
               ...action.payload
            }
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

      default:
         return state
   }
}