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

   function setValue(event: any): void {
      if (event.target.type === 'checkbox') {
         return state$.patch(
            `values.${event.target.name}`,
            event.target.checked
         )
      }

      return state$.patch(
         'values.'.concat(event.target.name),
         event.target.value
      )
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
            ref.current?.addEventListener('input', e => setValue(e))
         } else if (initial?.mode === 'onBlur') {
            ref.current?.addEventListener('blur', e => setValue(e))
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
      }, [])

      return {
         name,
         ref
      }
   }

   React.useEffect(() => {
      const unsubscribe = state$.subscribe(setState)
      return () => unsubscribe()
   }, [])

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

   function setFieldValue(field: string, value: any) {
      state$.patch('values.'.concat(field), value)
   }

   function resetFieldValue(field: string) {
      state$.patch('values.'.concat(field), '')
   }

   function setErrors(errors: any) {
      state$.patch('errors', errors)
   }

   function setFieldError(field: string, error: string) {
      state$.patch('errors.'.concat(field), error)
   }

   function resetFieldError(field: string) {
      state$.patch('errors.'.concat(field), '')
   }

   function resetErrors() {
      state$.patch('errors', {})
   }

   function setTouched(touched: any) {
      state$.patch('touched', touched)
   }

   function resetTouched() {
      state$.patch('touched', {})
   }

   function setFieldTouched(field: string) {
      state$.patch('touched.'.concat(field), true)
   }

   function resetFieldTouched(field: string) {
      state$.patch('touched.'.concat(field), false)
   }

   return {
      register,
      state$,
      state,

      setTouched,
      resetTouched,
      setFieldTouched,
      resetFieldTouched,

      setErrors,
      resetErrors,
      setFieldError,
      resetFieldError,

      setValues,
      resetValues,
      setFieldValue,
      resetFieldValue
   }
}
