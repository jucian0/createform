/* eslint-disable react-hooks/rules-of-hooks */
import { useRef, useState, useEffect, useCallback, createRef, ChangeEvent } from "react"
import State from "../State"
import { debounce } from "../Debounce"
import {
   FieldParam,
   InputProps,
   UseFormR,
   ListInputsRef,
   InputRegisterProps,
   InputPartialProps,
   RefFieldElement,
   UseForm,
} from "../Types"
import dot from 'dot-prop-immutable'
import { isRadio, isCheckbox } from "../Utils"
import { useValidation } from "../UseValidation"


export function useForm<TInitial extends {}, TSchema = any>({
   initialValues,
   validation,
   ...optionsGetValues
}: UseForm<TInitial, TSchema>): UseFormR<TInitial> {

   const state = useRef(new State(initialValues || {} as TInitial))
   const listInputsRef = useRef<ListInputsRef>(Object.assign({}))
   const [values, setValues] = useState(initialValues || {} as TInitial)
   const inputsTouched = useRef<TInitial>({} as TInitial)
   const { errors, isValid } = useValidation(values, validation || {} as any)

   const setValuesDebounce = useCallback(debounce(setValues, optionsGetValues?.debounce || 500), [optionsGetValues])

   function setRefValue(input: InputRegisterProps<any>, value: any) {

      if (!input?.ref?.current) {
         return
      }
      const type = input.ref.current.type;

      if (isRadio(type)) {
         return input.ref.current.checked = input.ref.current.value === value
      } else if (isCheckbox(type)) {
         return input.ref.current.checked = Boolean(value)
      }
      return input.ref.current.value = value || null
   }

   function registerInput(props: InputPartialProps) {
      const inputProps = {
         ...listInputsRef.current,
         [props.name]: { ...props, ref: createRef<HTMLInputElement>() }
      } as ListInputsRef

      listInputsRef.current = inputProps
      return listInputsRef.current[props.name]
   }

   const onSubmit = useCallback((fn: (values: TInitial) => void) => {
      return (e: React.BaseSyntheticEvent) => {
         e.preventDefault()
         setValues({ ...state.current.getState })
         Object.keys(listInputsRef.current).forEach(key => {
            inputsTouched.current = dot.set(inputsTouched.current, listInputsRef.current[key].name, true)
         })

         if ((validation as any)?.isValidSync(state.current.getState)) {
            fn(state.current.getState)
         }
      }
   }, [validation])

   function reset() {
      state.current.reset()
      Object.keys(listInputsRef.current).forEach(key => {
         setRefValue(listInputsRef.current[key], dot.get(state.current.getState, key))
         inputsTouched.current = dot.set(inputsTouched.current, listInputsRef.current[key].name, false)
      })
      setValues(state.current.getState)
   }

   function resetField(fieldPath: string) {
      const value = state.current.resetField(fieldPath)
      if (listInputsRef.current[fieldPath]?.type === "custom") {
         setValues(dot.set(values, fieldPath, value))
      }
      setRefValue(listInputsRef.current[fieldPath], value)
   }

   function setOnBlur(fieldPath: string) {
      if (inputsTouched.current) {
         inputsTouched.current = dot.set(inputsTouched.current, fieldPath, true)
         if (optionsGetValues.debounce || optionsGetValues.onChange) {
            setValues({ ...values })
         }
      }
   }


   function custom<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
      const complementProps: any = (typeof param === 'string') ? { name: param } : { ...param }

      function onChange(e: any) {
         state.current.change({
            fieldPath: complementProps.name,
            value: e,
         })
      }

      function onBlur() {
         setOnBlur(complementProps.name)
      }

      const props = registerInput({
         value: dot.get(values, complementProps.name),
         onChange,
         onBlur,
         type: "custom",
         ...complementProps,
      })

      return props
   }


   function input(param: FieldParam<InputProps>, ...args: Array<string>): InputRegisterProps<RefFieldElement> {

      const complementProps = (typeof param === 'string') ? { name: param, type: args[0] } : { ...param }

      if (isCheckbox(complementProps.type) || isRadio(complementProps.type)) {
         return baseChecked(complementProps)
      }
      return baseDefaultInput(complementProps)
   }


   function baseDefaultInput(complementProps: InputProps) {

      function onChange(e: ChangeEvent<HTMLInputElement>) {
         state.current.change({
            fieldPath: e.target.name,
            value: complementProps.type === "number" ? e.target.valueAsNumber :
               complementProps.type === 'date' ? e.target.valueAsDate :
                  complementProps.type === 'file' ? e.target.files :
                     e.target.value
         })
      }

      function onBlur() {
         setOnBlur(complementProps.name)
      }

      const props = registerInput({
         defaultValue: state.current.getValue(complementProps.name),
         onChange,
         onBlur,
         ...complementProps,
      })

      return props
   }


   function baseChecked(complementProps: InputProps) {
      function onChange(e: ChangeEvent<HTMLInputElement>) {
         state.current.change({
            fieldPath: e.target.name,
            value: complementProps.type === 'radio' ? e.target.value : e.target.checked
         })
      }

      function onBlur() {
         setOnBlur(complementProps.name)
      }

      const props = registerInput({
         defaultChecked: complementProps.type === 'radio' ?
            state.current.getValue(complementProps.name) === complementProps.value :
            state.current.getValue(complementProps.name),
         onChange,
         onBlur,
         ...complementProps
      })
      return props
   }

   const hasCustomInputs = useCallback(() => {
      return Object.keys(listInputsRef.current)
         .filter(ref => listInputsRef.current[ref].type === 'custom')
         .map(field => listInputsRef.current[field].name)
   }, [])

   const setFormState = useCallback((newValues: TInitial, fieldPath: string) => {
      if (JSON.stringify(newValues) === JSON.stringify(values)) {
         return
      }
      if (optionsGetValues?.debounce) {
         return setValuesDebounce(newValues)
      } else if (optionsGetValues?.onChange) {
         return setValues(newValues)
      } else if (hasCustomInputs()) {
         if (hasCustomInputs().includes(fieldPath)) {
            return setValues(newValues)
         }
      }

   }, [hasCustomInputs, optionsGetValues, setValuesDebounce, values])

   useEffect(() => {
      const subscriber = state.current.subscribe(setFormState)
      return () => {
         subscriber()
      }
   }, [setFormState])

   return [
      { values, onSubmit, reset, resetField, errors, isValid, touched: inputsTouched.current },
      { input, custom }
   ]
}