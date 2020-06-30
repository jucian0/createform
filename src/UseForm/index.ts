/* eslint-disable react-hooks/rules-of-hooks */
import React, { useRef, useState, useEffect, useCallback, createRef, ChangeEvent } from 'react'
import State from '../State'
import { debounce } from '../Debounce'
import {
  FieldParam,
  InputProps,
  UseFormR,
  ListInputsRef,
  InputRegisterProps,
  InputPartialProps,
  RefFieldElement,
  UseForm,
} from '../Types'
import dot from 'dot-prop-immutable'
import { isRadio, isCheckbox } from '../Utils'
import { useValidation } from '../UseValidation'
import { Schema } from 'yup'

export function useForm<TInitial extends {}, TSchema extends Schema<TInitial> = any>({
  initialValues,
  validation,
  ...optionsGetValues
}: UseForm<TInitial, TSchema>): UseFormR<TInitial> {
  const state = useRef(new State(initialValues || ({} as TInitial)))
  const listInputsRef = useRef<ListInputsRef>(Object.assign({}))
  const [values, setValues] = useState(initialValues || ({} as TInitial))
  const inputsTouched = useRef<TInitial>({} as TInitial)
  const { errors, isValid } = useValidation(values, validation)

  /**
   * This function set form values with a delay time,by default has a 500 milliseconds.
   * When uses a option debounce form this function is used to set a new form values.
   */
  const setValuesDebounce = useCallback(debounce(setValues, optionsGetValues?.debounce || 500), [
    optionsGetValues,
  ])


  /**
   * The purpose that function is set a new value in value ref of a every input element.
   * @param input is a object with properties like ref input.
   * @param value that value is placed on input ref value
   */
  function setRefValue(input: InputRegisterProps<any>, value: any) {
    if (!input?.ref?.current) {
      return
    }
    const type = input.ref.current.type

    if (isRadio(type)) {
      return (input.ref.current.checked = input.ref.current.value === value)
    } else if (isCheckbox(type)) {
      return (input.ref.current.checked = Boolean(value))
    }
    return (input.ref.current.value = value || null)
  }

  /**
   * That function register every inputs, and it return a input props.
   * @param props {
   *   name: string
   *    defaultValue?: any
   *   value?: any
   *   onChange: (...args: Array<any>) => void
   *   onBlur?: (...args: Array<any>) => void
   *   type?: string
   *   defaultChecked?: any
   * }
   */
  function registerInput(props: InputPartialProps) {
    const inputProps = {
      ...listInputsRef.current,
      [props.name]: { ...props, ref: createRef<HTMLInputElement>() },
    } as ListInputsRef

    /**
     * creating a input props an put one on a specific key in listInputsRef.
     */
    listInputsRef.current = inputProps
    return listInputsRef.current[props.name]
  }

  /**
   * onSubmit return a function that executed when onSubmit event is called. 
   * That function is option when uses a form like controlled or debounce. 
   */
  const onSubmit = useCallback(
    (fn: (values: TInitial) => void) => {
      return (e: React.BaseSyntheticEvent) => {
        e.preventDefault()
        setValues({ ...state.current.getState })

        Object.keys(listInputsRef.current).forEach((key) => {
          inputsTouched.current = dot.set(
            inputsTouched.current,
            listInputsRef.current[key].name,
            true
          )
        })

        /**
         * if validations is false it's means that the function can return the form value. 
         * If not this means that form values not valid. 
         */
        if (!validation) {
          fn(state.current.getState)
        } else if ((validation as any)?.isValidSync(state.current.getState)) {
          fn(state.current.getState)
        }
      }
    },
    [validation]
  )

  function reset() {
    state.current.reset()
    setRefInputsValues()
  }

  function setInputs(values: TInitial) {
    state.current.setState = values
    setRefInputsValues()
  }

  function setRefInputsValues() {
    Object.keys(listInputsRef.current).forEach((key) => {
      setRefValue(listInputsRef.current[key], dot.get(state.current.getState, key))
      inputsTouched.current = dot.set(inputsTouched.current, listInputsRef.current[key].name, false)
    })
    setValues(state.current.getState)
  }

  function resetInput(fieldPath: string) {
    state.current.resetInput(fieldPath)
    const value = state.current.getValue(fieldPath)
    changeRefInputValue(fieldPath, value)
  }

  function setInput<TValue>(fieldPath: string, newValue: TValue) {
    state.current.change({ value: newValue, fieldPath })
    const value = state.current.getValue(fieldPath)
    changeRefInputValue(fieldPath, value)
  }

  function changeRefInputValue<T>(fieldPath: string, value: T) {
    if (listInputsRef.current[fieldPath]?.type === 'custom') {
      setValues(dot.set(values, fieldPath, value))
    }
    setRefValue(listInputsRef.current[fieldPath], value)
  }

  /**
   * Set in a list of input if is touched or not.
   * inputTouched is an object with the same shape of object values,
   * it's convenient to use the same field path for object values ​​and object touched to find and put the value with dot notation.
   */
  function setOnBlur(fieldPath: string) {
    if (inputsTouched.current) {
      inputsTouched.current = dot.set(inputsTouched.current, fieldPath, true)
      if (optionsGetValues.debounce || optionsGetValues.onChange) {
        setValues({ ...values })
      }
    }
  }

  /**
   * 
   * @param param this is object with properties of a custom input.
   * custom function register a custom inputs like a react date piker or react-select.
   */
  function custom<Custom = any>(param: Custom): InputRegisterProps<RefFieldElement> {
    const complementProps: any = typeof param === 'string' ? { name: param } : { ...param }

    function onChange(e: any) {
      state.current.change({
        fieldPath: complementProps.name,
        value: e,
      })
    }

    function onBlur() {
      setOnBlur(complementProps.name)
    }

    /**
     * set a type custom to filter a custom inputs in complex forms.
     */
    const props = registerInput({
      value: dot.get(values, complementProps.name),
      onChange,
      onBlur,
      type: 'custom',
      ...complementProps,
    })

    return props
  }

  /**
   * 
   * @param param is a object with the same properties of native input in react like {type, checked, value ...}
   * @param args get a rest o arguments like type whe use approach like this {<input {...input("test", "text")}/>}
   * this function register a default input with default properties.
   */
  function input(
    param: FieldParam<InputProps>,
    ...args: Array<string>
  ): InputRegisterProps<RefFieldElement> {
    const complementProps =
      typeof param === 'string' ? { name: param, type: args[0] } : { ...param }


    /**
     * To turn logic easier has a function to process input checkbox or radio and baseDefaultInput for another kind of input like text, data...
     */
    if (isCheckbox(complementProps.type) || isRadio(complementProps.type)) {
      return baseChecked(complementProps)
    }
    return baseDefaultInput(complementProps)
  }

  function baseDefaultInput(complementProps: InputProps) {
    function onChange(e: ChangeEvent<HTMLInputElement>) {
      state.current.change({
        fieldPath: e.target.name,
        value:
          complementProps.type === 'number'
            ? Number(e.target.value)
            : complementProps.type === 'date'
              ? e.target.value
              : complementProps.type === 'file'
                ? e.target.files
                : e.target.value,
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
        value: complementProps.type === 'radio' ? e.target.value : e.target.checked,
      })
    }

    function onBlur() {
      setOnBlur(complementProps.name)
    }

    const props = registerInput({
      defaultChecked:
        complementProps.type === 'radio'
          ? state.current.getValue(complementProps.name) === complementProps.value
          : state.current.getValue(complementProps.name),
      onChange,
      onBlur,
      ...complementProps,
    })
    return props
  }

  const hasCustomInputs = useCallback(() => {
    return Object.keys(listInputsRef.current)
      .filter((ref) => listInputsRef.current[ref].type === 'custom')
      .map((field) => listInputsRef.current[field].name)
  }, [])

  const setFormState = useCallback(
    (newValues: TInitial, fieldPath: string) => {
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
    },
    [hasCustomInputs, optionsGetValues, setValuesDebounce, values]
  )

  useEffect(() => {
    const subscriber = state.current.subscribe(setFormState)
    return () => {
      subscriber()
    }
  }, [setFormState])

  return [
    {
      values,
      onSubmit,
      reset,
      resetInput,
      errors,
      isValid,
      touched: inputsTouched.current,
      setInput,
      setInputs,
    },
    { input, custom },
  ]
}
