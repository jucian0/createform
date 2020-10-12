import dot from "dot-prop-immutable"

export type Action = {
   type: 'errors' | 'values' | 'touched' | 'isValid',
   payload: any
}

export type BaseState<T> = {
   errors: T,
   values: T,
   touched: T,
   // isValid: boolean
}


export function useFormTestReducer<T extends BaseState<T['values']>>(state: T, nextState: Partial<T>): BaseState<T['values']> {
   return { ...state, ...nextState }
}