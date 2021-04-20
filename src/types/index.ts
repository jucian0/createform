import * as React from 'react'
import { Schema as YupSchema } from 'yup'

/**
 * Input reference is a union with all kinds of native inputs.
 */
export type Ref = {
   current: HTMLInputElement & HTMLSelectElement & HTMLTextAreaElement
}

/**
 * This is the type of Register function, we just need the name and the reference of input
 */
type RegisterReturn = {
   name: string
   ref: Ref
}

/**
 * inputs reference is a type that of an object that has all native input in a form.
 */
export type InputsRef = { [path: string]: Ref }

/**
 * Touched type represents a touched object that has all properties of a form values, when this properties is primitive type ww convert this in a boolean,
 *  otherwise if this an object we start again validating every properties.
 */
export type Touched<T extends {}> = {
   [k in keyof T]: T[k] extends number | string | boolean | Date
      ? boolean
      : Touched<T[k]>
}

/**
 * Errors type represents a errors object that has all properties of a form values, when this properties is primitive type ww convert this in a string,
 *  otherwise if this an object we start again validating every properties.
 */
export type Errors<T extends {}> = {
   [k in keyof T]: T[k] extends number | string | boolean | Date
      ? string
      : Touched<T[k]>
}

export type Options<T> = {
   initialValues?: T
   initialErrors?: Errors<T>
   initialTouched?: Touched<T>
   isControlled?: boolean
   debounced?: number
   validationSchema?: YupSchema<T>
   watch?: (e: T) => void
}

export type State<T> = {
   values: T
   errors: Errors<T>
   touched: Touched<T>
}

export type UseFormReturnType<T> = {
   setForm: (next: ChangeState<State<T>>) => void
   resetForm: () => void

   setFieldsValue: (next: ChangeState<T>) => void
   setFieldValue: (path: Paths<T>, value: any) => void
   resetFieldsValue: () => void
   resetFieldValue: (path: Paths<T>) => void

   setFieldsTouched: (next: ChangeState<Touched<T>>) => void
   setFieldTouched: (path: Paths<T>, value: boolean) => void
   resetFieldsTouched: () => void
   resetFieldTouched: (path: Paths<T>) => void

   setFieldError: (path: Paths<T>, error: any) => void
   setFieldsError: (next: ChangeState<Errors<T>>) => void
   resetFieldError: (path: Paths<T>) => void
   resetFieldsError: () => void

   state: State<T>
   register: Register
   onSubmit: (fn: (values: T, isValid: boolean) => void) => HandleSubmit
}

export type Register = (path: string) => RegisterReturn

export type Change = React.ChangeEvent<HTMLInputElement>

export type ChangeState<T> = T | ((state: T) => T)
export type HandleSubmit = (e: React.BaseSyntheticEvent) => Promise<any>

export type Paths<T> = keyof T | string

// type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

// type Join<K, P> = K extends string | number ? P extends string | number ? `${K}${"" extends P ? "" : "."}${P}` : never : never;

// export type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ? { [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never }[keyof T] : "";
