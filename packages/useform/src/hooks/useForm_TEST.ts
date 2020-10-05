import React from "react";
import dot from 'dot-prop-immutable'
import { Observable } from "../core/observable";
import { BaseState, useFormTestReducer } from "./useForm_TEST.reducer";
import { Reducer } from "react";


type Options<T> = {
   initialValues?: T,
   initialErrors?: T,
   initialTouched?: T,
   isControlled?: boolean,
   debounced?: number
}

type Ref = {
   current: HTMLInputElement
}

type Change = React.ChangeEvent<HTMLInputElement>

export function useFormTest<TO extends Options<TO['initialValues']>>(options: TO) {

   const { current: values$ } = React.useRef(new Observable(options.initialValues || {}))
   const { current: touched$ } = React.useRef(new Observable(options.initialTouched || {}))

   const refs = React.useRef<{ current: { [key: string]: Ref } }>({} as any)

   const [state, dispatch] = React.useReducer<Reducer<BaseState<TO['initialValues']>, any>>(
      useFormTestReducer,
      {
         values: options.initialValues || {},
         error: options.initialErrors || {},
         touched: options.initialTouched || {}
      })

   function handleChanges(e) {
   }

   function register(path: string) {
      const newRefs = {
         ...refs.current,
         [path]: React.createRef<Ref>()
      }

      refs.current = newRefs
      return { name: path, ref: refs.current[path] }
   }

   function handleEvent(event: string) {
      if (event === 'input') {
         return (e: Change) => {
            console.log(e.target.name, '<<<<<<<<<<<<<<<<<<<')
            const nextState = dot.set(values$.get, e.target.name, e.target.value)
            values$.set = nextState
         }
      }

      return (e: Change) => {
         const nextState = dot.set(touched$.get, e.target.name, true)
         touched$.set = nextState
      }
   }

   function addEvents(...args: Array<string>) {
      Object.keys(refs.current).forEach(key => {
         args.forEach(event => refs.current[key].current.addEventListener(event, handleEvent(event)))
      })
   }

   function removeEvents(...args: Array<string>) {
      Object.keys(refs.current).forEach(key => {
         args.forEach(event => refs.current[key].current.removeEventListener(event, handleEvent(event)))
      })
   }

   React.useEffect(() => {

      values$.subscribe(e => console.log(e))
      touched$.subscribe(e => console.log(e))

   }, [])

   React.useEffect(() => {
      addEvents('input', 'blur')
      return () => {
         removeEvents('input', 'blur')
      }
   }, [refs])

   return { register }

}