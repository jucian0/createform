import * as React from 'react'
import { FormContext } from '../core/contextForm'
import { UseFormReturnType } from '../types'

export function useFormContext<T>() {
   const form = React.useContext<any>(FormContext)

   return form as UseFormReturnType<T>
}
