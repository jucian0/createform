import React from 'react'
import { createState } from '../core/observable'
import { debounce } from '../utils'

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
   const { current: state$ } = React.useRef(createState(initial?.initialState))
   const [state, setState] = React.useState(initial?.initialState)
   const setStateDebounced = React.useCallback(debounce(setValue, 500), [])
   const fields = React.useRef({})

   function setValue(event: any): void {
      if (event.target.type === 'checkbox') {
         return state$.patch(
            'values.'.concat(event.target.name),
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
            'values.'.concat(ref.current.name)
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
         } else if (initial?.mode === 'debounced') {
            ref.current?.addEventListener('input', e => setStateDebounced(e))
         }
         return () => {
            if (initial?.mode === 'onChange') {
               ref.current?.removeEventListener('input', setValue)
            } else if (initial?.mode === 'onBlur') {
               ref.current?.removeEventListener('blur', setValue)
            } else if (initial?.mode === 'debounced') {
               ref.current?.removeEventListener('input', setStateDebounced)
            }
         }
      }, [])

      React.useEffect(() => {
         setRefValue(ref, state$.getPropertyValue('values.'.concat(name)))
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
      state$.set(state$.getInitialState().values as any)
      for (const field in fields.current) {
         fields.current[field].value = state$.getInitialPropertyValue(field)
      }
   }

   function setValues(values: any) {
      state$.patch('values', values)
      for (const field in fields.current) {
         if (values[field]) {
            fields.current[field].value = values[field]
         }
      }
   }

   function setFieldValue(field: string, value: any) {
      const path = 'values.'.concat(field)

      state$.patch(path, value)
      if (fields.current[field]) {
         fields.current[field].value = value
      }
   }

   function handleChange(event: any) {
      const path = 'values.'.concat(event.target.name)
      if (event.target.type === 'checkbox') {
         return state$.patch(path, event.target.checked)
      }
      state$.patch(path, event.target.value)
   }

   function resetFieldValue(field: string) {
      const path = 'values.'.concat(field)
      state$.patch(path, state$.getInitialPropertyValue(path))
      fields.current[field].value = state$.getInitialPropertyValue(path)
   }

   function setErrors(errors: any) {
      state$.patch('errors', errors)
   }

   function setFieldError(field: string, error: string) {
      const path = 'errors.'.concat(field)
      state$.patch(path, error)
   }

   function resetFieldError(field: string) {
      const path = 'errors.'.concat(field)
      state$.patch(path, state$.getInitialPropertyValue(path))
   }

   function resetErrors() {
      state$.patch('errors', state$.getInitialState().errors)
   }

   function setTouched(touched: any) {
      state$.patch('touched', touched)
   }

   function resetTouched() {
      state$.patch('touched', state$.getInitialState().touched)
   }

   function setFieldTouched(field: string) {
      state$.patch('touched.'.concat(field), true)
   }

   function resetFieldTouched(field: string) {
      state$.patch('touched.'.concat(field), false)
   }

   function setForm(nextState: any) {
      setValues(nextState.values)
      setErrors(nextState.errors)
      setTouched(nextState.touched)
   }

   function resetForm() {
      setValues(state$.getInitialState().values)
      setErrors(state$.getInitialState().errors)
      setTouched(state$.getInitialState().touched)
   }

   return {
      state$,
      state,
      register,

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
      resetFieldValue,
      handleChange,

      resetForm,
      setForm
   }
}
