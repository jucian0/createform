import React from 'react'
import { createState } from '../core/observable'

type InitialState = {
   values?: {}
   errors?: {}
   touched?: {}
}

type HookParams = {
   initialState?: InitialState
   onSubmit?: (values: {}) => void
   mode?: 'onChange' | 'onBlur' | 'onSubmit' | 'debounced'
}

export function useForm(initial?: HookParams) {
   const initialState = React.useRef(initial?.initialState)
   const state$ = createState(initial?.initialState)
   const [state, setState] = React.useState(initial?.initialState)
   const fields = React.useRef({})

   function resetValues() {
      state$.set(initialState.current as any)
      for (const field in fields.current) {
         fields.current[field].value = ''
      }
   }

   function setValues(values: any) {
      state$.patch('values', values)
      for (const field in fields.current) {
         fields.current[field].value = values[field]
      }
   }

   function setValue(event: any): void {
      if (event.target.type === 'checkbox') {
         return state$.patch(event.target.name, event.target.checked)
      }
      return state$.patch(event.target.name, event.target.value)
   }

   function setRefValue(ref: any, value: any) {
      if (ref.current.type === 'radio') {
         const inputs = Array.from<HTMLInputElement>(
            ref.current.form.querySelectorAll(
               'input[name="' + ref.current.name + '"]'
            )
         )

         for (const input of inputs) {
            input.checked = input.value === value
         }
      } else {
         fields.current[ref.current.name] = ref.current
         ref.current.value = state$.getPropertyValue(
            `values.${ref.current.name}`
         )
      }
   }

   function register(name: string) {
      const ref = React.useRef<HTMLInputElement>(null)

      React.useEffect(() => {
         if (initial?.mode === 'onChange') {
            ref.current?.addEventListener('input', setValue)
         } else if (initial?.mode === 'onBlur') {
            ref.current?.addEventListener('blur', setValue)
         }
         return () => {
            if (initial?.mode === 'onChange') {
               ref.current?.removeEventListener('input', setValue)
            } else if (initial?.mode === 'onBlur') {
               ref.current?.removeEventListener('blur', setValue)
            }
         }
      }, [name, ref.current])

      React.useEffect(() => {
         setRefValue(ref, state$.getPropertyValue(`values.${name}`))
      }, [ref.current])

      return {
         name,
         ref
      }
   }

   React.useEffect(() => {
      const unsubscribe = state$.subscribe(setState)
      return () => unsubscribe()
   }, [])

   return {
      register,
      resetValues,
      state$,
      state
   }
}
