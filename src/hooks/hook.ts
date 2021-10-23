import React from 'react'
import { createState } from '../core/observable'

type InitialForm = {
   values: {}
   errors: {}
   touched: {}
}

export function useForm(initial?: InitialForm) {
   const state$ = createState(initial)

   function register(name: string) {
      const ref = React.useRef<HTMLInputElement>(null)

      React.useEffect(() => {
         ref.current?.addEventListener('input', () => {
            state$.patch(name, ref.current?.value)
         })
      }, [name, ref.current])

      return {
         name,
         ref
      }
   }

   return {
      register,
      state$
   }
}
