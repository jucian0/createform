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

export function deepComparative<TFV, TFS>(firstValue: TFV, secondValue: TFS) {
   let result = false
   if (typeof firstValue === 'object') {
      result = JSON.stringify(firstValue) !== JSON.stringify(secondValue)
   } else {
      result = String(firstValue) !== String(secondValue)
   }

   return {
      isEqual: () => result === true,
      isDifferent: () => result === false
   }
}

export function isEmpty(obj: any) {
   return Object.keys(obj).length > 0
}

export function makeDotNotation(str: string) {
   return str.split('[').join('.').split(']').join('')
}
