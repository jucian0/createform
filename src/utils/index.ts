import { Schema, ValidationError } from 'yup'
import * as dot from './dot-prop'

export const isRadio = (type: string) => type === 'radio'

export const isCheckbox = (type: string) => type === 'checkbox'

export function debounce<TThis, TFn extends Function>(
   this: TThis,
   fn: TFn,
   wait: number,
   immediate?: boolean
) {
   let timeout: any

   return <TArgs>(...args: Array<TArgs>) => {
      const context = this

      const later = () => {
         timeout = null
         if (!immediate) fn.apply(context, args)
      }

      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) {
         fn.apply(context, args)
      }
   }
}

export function makeDotNotation(str: string) {
   return str.split('[').join('.').split(']').join('')
}

export function getNextState(next: any, state: any) {
   const nextState = typeof next === 'function' ? next(state) : next
   return nextState
}

export function validate<TValues extends {}>(
   values: TValues,
   validationSchema: Schema<TValues>
) {
   return validationSchema
      ?.validate(values, { abortEarly: false })
      .then(() => {
         return {}
      })
      .catch((e: ValidationError) => {
         throw e.inner.reduce((acc, key) => {
            const path = makeDotNotation(key.path)
            return dot.set(acc, path, key.message)
         }, {})
      })
}
