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
import { debounce, getNextState, isCheckbox, validate } from '../utils'
import * as dot from '../utils/dot-prop'
import { createException } from '../utils/exceptions'

export function useForm<TInitial extends Options<TInitial['initialValues']>>(
   initial?: TInitial
): UseFormReturnType<TInitial['initialValues']> {
   const initialState = {
      values: initial?.initialValues,
      errors: initial?.initialErrors,
      touched: initial?.initialTouched
   }
   const { current: state$ } = React.useRef(
      createState<any>(initialState as any)
   )
   const [state, setState] = React.useState<State<TInitial['initialValues']>>(
      initialState as any
   )

   const setStateDebounced = React.useCallback(debounce(setState, 500), [])
   const fields = React.useRef({})

   async function setValue(event: any) {
      const validationSchema = initial?.validationSchema
      const currentState = state$.get()
      const nextChecked = event.target.checked
      const nextValue = isNaN(event.target.value)
         ? event.target.value
         : parseInt(event.target.value)

      const nextState = dot.set(
         currentState,
         'values.'.concat(event.target.name),
         isCheckbox(event.target.type) ? nextChecked : nextValue
      )
      const nextTouched = dot.set(
         currentState,
         'touched.'.concat(event.target.name),
         true
      )

      try {
         if (validationSchema) {
            await validate(nextState.values, validationSchema)
            return state$.set({
               values: nextState.values,
               errors: {},
               touched: nextTouched.touched
            })
         }

         return state$.set({
            values: nextState.values,
            errors: nextState.errors,
            touched: nextTouched.touched
         })
      } catch (errors) {
         return state$.set({
            values: nextState.values,
            errors: errors,
            touched: nextTouched.touched
         })
      }
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
         ref.current.value = value
      }
   }

   function register(name: string): RegisterReturn {
      if (!name) {
         createException(
            'Register Function',
            'argument field name is necessary'
         )
      }
      const ref = React.useRef<Ref>(null)

      React.useEffect(() => {
         ref.current?.addEventListener('input', setValue)
         return () => {
            ref.current?.removeEventListener('input', setValue)
         }
      }, [])

      React.useEffect(() => {
         if (initial?.mode === 'onBlur') {
            ref.current?.addEventListener('blur', handleOnBlur)
            return () => {
               ref.current?.removeEventListener('blur', handleOnBlur)
            }
         }
         return () => {}
      }, [])

      React.useEffect(() => {
         const value = state$.getPropertyValue('values.'.concat(name))
         if (typeof value === 'undefined') {
            return setRefValue(ref, '')
         }
         return setRefValue(ref, value)
      }, [])

      return {
         name,
         ref
      }
   }

   function handleOnBlur() {
      setState(state$.get())
   }

   function persistNextState(nextState: State<TInitial['initialValues']>) {
      if (initial?.mode === 'debounced') {
         setStateDebounced(nextState)
      } else if (initial?.mode === 'onChange') {
         setState(nextState)
      }
   }

   React.useEffect(() => {
      const unsubscribe = state$.subscribe(persistNextState)
      return () => unsubscribe()
   }, [])

   function resetFieldsValue() {
      state$.set({ ...state, values: state$.getInitialState().values as any })
      for (const field in fields.current) {
         const path = 'values.'.concat(field)
         fields.current[field].value = state$.getInitialPropertyValue(path)
      }
      setState(state$.get())
   }

   function setFieldsValue(next: SetType<TInitial['initialValues']>) {
      if (!next) {
         createException('SetFieldsValue Function', 'argument next is required')
      }
      const values = getNextState(next, state?.values)
      state$.patch('values', values)
      for (const field in fields.current) {
         if (typeof fields.current[field] !== 'undefined') {
            fields.current[field].value = dot.get(values, field)
         }
      }
      setState(state$.get())
   }

   function setFieldValue(field: string, value: any) {
      if (!value || !field) {
         createException(
            'SetFieldValue Function',
            'argument field and value are required'
         )
      }
      const path = 'values.'.concat(field)

      state$.patch(path, value)
      if (fields.current[field]) {
         fields.current[field].value = value
      }
      setState(state$.get())
   }

   function handleChange(event: any) {
      if (!event.target.name) {
         createException(
            'HandleChange Function',
            'property input name is necessary'
         )
      }
      const path = 'values.'.concat(event.target.name)
      if (isCheckbox(event.target.type)) {
         state$.patch(path, event.target.checked)
      }
      state$.patch(path, event.target.value)
      setState(state$.get())
   }

   function resetFieldValue(field: string) {
      if (!field) {
         createException(
            'ResetFieldValue Function',
            'argument field is necessary'
         )
      }
      const path = 'values.'.concat(field)
      state$.patch(path, state$.getInitialPropertyValue(path))
      fields.current[field].value = state$.getInitialPropertyValue(path)
      setState(state$.get())
   }

   function setFieldsError(next: SetType<TInitial['initialErrors']>) {
      if (!next) {
         createException(
            'SetFieldsError Function',
            'argument next is necessary'
         )
      }
      const errors = getNextState(next, state?.errors)
      state$.patch('errors', errors)
      setState(state$.get())
   }

   function setFieldError(field: string, error: string) {
      if (!error || !field) {
         createException(
            'SetFieldError Function',
            'argument field and error are necessary'
         )
      }
      const path = 'errors.'.concat(field)
      state$.patch(path, error)
      setState(state$.get())
   }

   function resetFieldError(field: string) {
      if (!field) {
         createException('`resetFieldError()` - field is necessary')
      }
      const path = 'errors.'.concat(field)
      state$.patch(path, state$.getInitialPropertyValue(path))
      setState(state$.get())
   }

   function resetFieldsError() {
      state$.patch('errors', state$.getInitialState().errors)
      setState(state$.get())
   }

   function setFieldsTouched(next: SetType<TInitial['initialTouched']>) {
      if (!next) {
         return makeAllTouched()
      }
      const touched = getNextState(next, state?.values)
      state$.patch('touched', touched)
      setState(state$.get())
   }

   function resetFieldsTouched() {
      state$.patch('touched', state$.getInitialState().touched)
      setState(state$.get())
   }

   function setFieldTouched(field: string) {
      if (!field) {
         createException(
            'SetFieldTouched Function',
            'name is necessary to set field as touched'
         )
      }
      state$.patch('touched.'.concat(field), true)
      setState(state$.get())
   }

   function resetFieldTouched(field: string) {
      if (!field) {
         createException(
            'ResetFieldTouched Function',
            'Field argument is necessary to reset a field'
         )
      }
      state$.patch('touched.'.concat(field), false)
      setState(state$.get())
   }

   function setForm(next: SetType<State<TInitial>>) {
      if (!next) {
         state$.set(state$.getInitialState())
      }
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

   function makeAllTouched() {
      for (const field in fields.current) {
         setFieldTouched(field)
      }
   }

   function onSubmit(
      fn: (values: TInitial['initialValues'], isValid: boolean) => void
   ) {
      if (!fn) {
         createException(
            'OnSubmit Function',
            'callback function is not defined'
         )
      }
      return async (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         const values = state$.getPropertyValue('values')
         try {
            if (initial?.validationSchema) {
               await validate(values, initial.validationSchema)
            }
            fn(values, true)
         } catch (errors) {
            fn(values, false)
            state$.set({
               ...state,
               errors,
               touched: makeAllTouched()
            })
         }
      }
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
