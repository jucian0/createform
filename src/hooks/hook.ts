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
         ref.current?.addEventListener('input', (e: any) => {
            if (ref.current?.type === 'checkbox') {
               state$.patch(`values.${name}`, ref.current?.checked)
            } else {
               state$.patch(`values.${name}`, e?.target?.value)
            }
         })

         if (ref.current?.type === 'radio') {
            Array.from(
               (ref.current as HTMLDivElement).getElementsByTagName('input')
            ).forEach((radio: any) => {
               radio.checked = radio.value == ref.current?.value
            })
         } else if (ref.current) {
            ref.current.value = state$.getPropertyValue(`values.${name}`)
         }
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
