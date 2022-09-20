import React from 'react'
import { createStore } from './Store'
import {
   CreateFormArgs,
   Errors,
   EventChange,
   Field,
   HookArgs,
   KeyValue,
   State,
   Touched
} from './Types'
import * as Dot from './ObjectUtils'
import { extractRadioElements, isCheckbox, isRadio } from './FieldsUtils'
import { debounce } from './Debounce'
import { validate } from './Validate'
import { StateChange } from '.'
import {
   InvalidArgumentException,
   InvalidOperationException
} from './Exception'

const defaultValues = {
   initialValues: {},
   initialErrors: {},
   initialTouched: {}
}

/**
 * createForm function create a form Store and return a hook that can be used to manage the form state.
 * @param args CreateFormArgs type that contains the initial values of form, initial errors of form, initial touched of form,
 * @returns {function(*): *} a function that returns a hook that can be used to manage the form state.
 **/
export function createForm<T extends CreateFormArgs<T['initialValues']>>(
   args: T
) {
   const { initialValues, initialErrors, initialTouched, validationSchema } = {
      ...defaultValues,
      ...args
   }

   /**
    * This is the store of the form,
    * it is an object that contains the values of form,
    * errors of form,
    * touched of form.
    **/
   const $store = createStore({
      values: initialValues,
      errors: initialErrors,
      touched: initialTouched,
      isValid: Dot.isEmpty(initialErrors)
   })

   return (hookArgs?: HookArgs<T['initialValues']>) => {
      /**
       * This is the reference of all native inputs of the form,
       * in order to have the same reference of all inputs of the form.
       **/
      const inputsRefs = React.useRef<KeyValue<React.RefObject<Field>>>({})

      /**
       * This is the state of the form,
       * it is an object that contains the values of form,
       * errors of form,
       * touched of form.
       **/
      const [state, setState] = React.useState<State<T['initialValues']>>(
         $store.get()
      )

      /**
       * Debounce mode is a mode that is used when the form is debounced,
       **/
      const setStateDebounced = React.useCallback(debounce(setState, 500), [])

      /**
       * This is the function that is used to set the state of the form, using debounce mode.
       * Because we are using native events to update the input value consequently we have many events that are fired at the same time,
       * so we need to debounce the state update to avoid the state to be updated many times.
       * @param state
       **/
      const persistNextStateDebounced = React.useCallback(
         debounce(persistNextState, 100),
         []
      )

      /**
       * Register a new input to the form,
       * this function is called by the Input component.
       * @param name the name of the input
       **/
      function register(name: string) {
         if (!name) {
            throw new InvalidArgumentException('Input name is required')
         }

         const ref = React.useRef<Field>(null)
         inputsRefs.current[name] = ref

         React.useEffect(() => {
            if (ref.current) {
               ref.current.name = name
               return persistInitialValues(name, Dot.get(initialValues, name))
            }
            throw new InvalidOperationException(
               'your input is not rendered yet, or you have not provided a name to the input, or you have not using the register function in the Input component'
            )
         }, [ref])

         React.useEffect(() => {
            ref.current?.addEventListener('input', handleChange as any)
            return () => {
               ref.current?.removeEventListener('input', handleChange as any)
            }
         }, [])

         React.useEffect(() => {
            if (ref.current) {
               ref.current.addEventListener('blur', handleBlur as any)
            }
            return () => {
               ref.current?.removeEventListener('blur', handleBlur as any)
            }
         }, [])

         return ref
      }

      /**
       * This function will handle input events of the form,
       * @param event the event that will be handled
       **/
      async function handleChange(event: EventChange) {
         const { name, value, checked } = event.target
         const nextValue =
            event.detail !== undefined && (event as any).detail !== 0
               ? event.detail
               : value

         if (isCheckbox(event.target as Field)) {
            $store.patch(`values.${name}`, checked)
         } else {
            $store.patch(`values.${name}`, nextValue)
         }

         try {
            await validate($store.getPropertyValue('values'), validationSchema)
            $store.patch('isValid', true)
            $store.patch('errors', {})
         } catch (errors: any) {
            $store.patch('isValid', false)
            $store.patch('errors', errors)
         }
         hookArgs?.onChange?.($store.getPropertyValue('values'))
      }

      /**
       * This function will handle blur events
       * @param event the event that will be handled
       **/
      function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
         const { name } = event.target
         $store.patch(`touched.${name}`, true)

         if (hookArgs?.onBlur) {
            hookArgs.onBlur(state.values)
         }
      }

      /**
       * This function will handle form submit
       **/
      function handleSubmit(
         submit: (values: T['initialValues'], isValid: boolean) => void
      ) {
         if (typeof submit !== 'function') {
            throw Error('Submit function is required')
         }
         /**
          * This function will handle submit event
          * @param event the event that will be handled
          **/
         return (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            const state = $store.get()
            const { values, isValid } = state
            setState(state)
            submit(values, isValid)
         }
      }

      /**
       * Persist initial values in native fields
       * @param values the values of the form
       **/
      function persistInitialValues(name: string, value: any) {
         setFieldValue(name, value)
      }

      /**
       * This function will set the value into input ref,
       * @param name the name of the input
       * @param value the value of the input
       **/
      function setFieldValue(name: string, value: any) {
         const ref = inputsRefs.current[name]
         if (ref && ref.current) {
            ref.current.value = value
            if (isCheckbox(ref.current)) {
               ref.current.checked = value
            } else if (isRadio(ref.current)) {
               const radios = extractRadioElements(ref.current)
               for (const radio of radios) {
                  radio.checked = radio.value === value
               }
            }
            /**---- Trigger change event ----*/
            ref.current.dispatchEvent(new Event('input'))
         } else {
            throw Error(
               `Input with name '${name}' is not registered, verify the input name.`
            )
         }
      }

      /**
       * This function will set all inputs value into the input elements,
       * @param values the values of the form
       **/
      function setFieldsValue(next: StateChange<T['initialValues']>) {
         const nextValues =
            //@ts-ignore
            typeof next === 'function' ? next(state.values) : next
         const names = Object.keys(inputsRefs.current)
         try {
            for (const name of names) {
               const next = Dot.get(nextValues, name)
               if (next !== undefined) {
                  setFieldValue(name, next)
               }
            }
         } catch (e) {
            console.error(e)
         }
      }

      /**
       * This function will set the error into the state of the form,
       * @param name the name of the input
       * @param error the error of the input
       **/
      function setFieldError(name: string, error: string) {
         try {
            $store.patch(`errors.${name}`, error)
         } catch (e) {
            console.error(e)
         }
      }

      /**
       * This function will set all inputs error into the state of the form,
       * @param errors the errors of the form
       **/
      function setFieldsError(next: StateChange<Errors<T['initialValues']>>) {
         const nextErrors =
            typeof next === 'function' ? next($store.get().errors) : next
         try {
            $store.patch('errors', nextErrors)
         } catch (e) {
            console.error(e)
         }
      }

      /**
       * This function will set the touched into the state of the form,
       * @param name the name of the input
       * @param touched the touched of the input
       **/
      function setFieldTouched(name: string, touched = true) {
         try {
            $store.patch(`touched.${name}`, touched)
         } catch (e) {
            console.error(e)
         }
      }

      /**
       * This function will set all inputs touched into the state of the form,
       * @param touched the touched of the form
       **/
      function setFieldsTouched(
         next: StateChange<Touched<T['initialValues']>>
      ) {
         const nextTouched =
            typeof next === 'function' ? next($store.get().touched) : next
         const names = Object.keys(inputsRefs.current)
         try {
            if (!nextTouched) {
               for (const name of names) {
                  setFieldTouched(name)
               }
            }
            $store.patch('touched', nextTouched)
         } catch (e) {
            console.error(e)
         }
      }

      /**
       * This function will reset the form as initial state,
       **/
      function reset() {
         setFieldsValue(initialValues as T['initialValues'])
         setFieldsError(initialErrors as Errors<T['initialErrors']>)
         setFieldsTouched(initialTouched as Touched<T['initialTouched']>)
      }

      /**
       * This function will reset the form as initial values,
       **/
      function resetValues() {
         setFieldsValue(initialValues as T['initialValues'])
      }

      /**
       * This function will reset the form as initial errors,
       **/
      function resetErrors() {
         $store.patch('errors', initialErrors as Errors<T['initialErrors']>)
      }

      /**
       * This function will reset the form as initial touched,
       **/
      function resetTouched() {
         $store.patch('touched', initialTouched as Touched<T['initialTouched']>)
      }

      /**
       * This function will patch the state of the form, by setting the value of the input into form store,
       * @param name the name of the input
       * @param value the value of the input
       **/
      function setFieldStoreValue(name: string, value: any) {
         try {
            $store.patch(`values.${name}`, value)
         } catch (e) {
            console.error(e)
         }
      }

      /**
       * This function will patch the state of the form, by setting the touched of the input into form store,
       * @param name the name of the input
       * @param touched the touched of the input
       **/
      function setFieldStoreTouched(name: string, touched = true) {
         try {
            $store.patch(`touched.${name}`, touched)
         } catch (e) {
            console.error(e)
         }
      }

      function persistNextState(nextState: State<T['initialValues']>) {
         if (hookArgs?.mode === 'debounce') {
            setStateDebounced(nextState)
         } else if (hookArgs?.mode === 'onChange') {
            setState(nextState)
         }
      }

      /**
       * Subscribe to the store to get the next state and update the form
       **/
      React.useEffect(() => {
         const unsubscribe = $store.subscribe(persistNextStateDebounced)
         return () => {
            unsubscribe()
         }
      }, [])

      return {
         form: $store,
         register,
         setFieldValue,
         setFieldsValue,
         setFieldError,
         setFieldsError,
         setFieldTouched,
         setFieldsTouched,
         reset,
         resetValues,
         resetErrors,
         resetTouched,
         handleSubmit,
         setFieldStoreTouched,
         setFieldStoreValue,
         state
      }
   }
}
