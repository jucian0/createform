import React from 'react'
import { createState } from '../core/observable'
import {
   Options,
   State,
   UseFormReturnType,
   RegisterReturn,
   Ref,
   SetType
} from '../types'
import { debounce, getNextState } from '../utils'
import * as dot from './../core/dot-prop'

export function useForm<TInitial extends Options<TInitial['initialValues']>>(
   initial?: TInitial
): UseFormReturnType<TInitial['initialValues']> {
   const initialState = {
      values: initial?.initialValues,
      errors: initial?.initialErrors,
      touched: initial?.initialTouched
   }
   const { current: state$ } = React.useRef(
      createState<TInitial['initialValues']>(initialState as any)
   )
   const [state, setState] = React.useState<State<TInitial['initialValues']>>(
      initialState as any
   )
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

   function register(name: string): RegisterReturn {
      const ref = React.useRef<Ref>(null)

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

   function resetFieldsValue() {
      state$.set(state$.getInitialState().values as any)
      for (const field in fields.current) {
         fields.current[field].value = state$.getInitialPropertyValue(field)
      }
   }

   function setFieldsValue(next: SetType<TInitial['initialValues']>) {
      const values = getNextState(next, state?.values)
      state$.patch('values', values)
      for (const field in fields.current) {
         if (fields.current[field]) {
            fields.current[field].value = dot.get(values, field)
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

   function setFieldsError(next: SetType<TInitial['initialErrors']>) {
      const errors = getNextState(next, state?.errors)
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

   function resetFieldsError() {
      state$.patch('errors', state$.getInitialState().errors)
   }

   function setFieldsTouched(next: SetType<TInitial['initialTouched']>) {
      const touched = getNextState(next, state?.values)
      state$.patch('touched', touched)
   }

   function resetFieldsTouched() {
      state$.patch('touched', state$.getInitialState().touched)
   }

   function setFieldTouched(field: string) {
      state$.patch('touched.'.concat(field), true)
   }

   function resetFieldTouched(field: string) {
      state$.patch('touched.'.concat(field), false)
   }

   function setForm(next: SetType<State<TInitial>>) {
      const nextState = getNextState(next, state)

      setFieldsValue(nextState.values)
      setFieldsError(nextState.errors)
      setFieldsTouched(nextState.touched)
   }

   function resetForm() {
      setFieldsValue(state$.getInitialState().values)
      setFieldsError(state$.getInitialState().errors)
      setFieldsTouched(state$.getInitialState().touched)
   }

   function onSubmit(event: any): any {
      event.preventDefault()
   }

   return {
      state,
      register,

      setFieldsTouched,
      resetFieldsTouched,
      setFieldTouched,
      resetFieldTouched,

      setFieldsError,
      resetFieldsError,
      setFieldError,
      resetFieldError,

      setFieldsValue,
      resetFieldsValue,
      setFieldValue,
      resetFieldValue,
      handleChange,

      resetForm,
      setForm,
      onSubmit
   }
}
