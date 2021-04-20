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

/**
 * useForm hook needs an object that describe and provide some properties like initial values of form, initial errors of form, initial touched of form,
 * and needs know what kind of form, is Controlled, debounced is about that.
 */
export type Options<T> = {
   /** represents a initial value of form */
   readonly initialValues?: T
   /** represents a initial values of inputs errors */
   readonly initialErrors?: Errors<T>
   /** represents a initial values of visited inputs */
   readonly initialTouched?: Touched<T>
   /**receives  true as a value if the form should be a controlled form  */
   readonly isControlled?: boolean
   /** receive a number if the form should be a debounced form */
   readonly debounced?: number
   /** validation schema provided by yup */
   readonly validationSchema?: YupSchema<T>
   /** watch every change in useForm even if is a uncontrolled form */
   readonly watch?: (e: T) => void
}

/**
 * state is one of properties that is returned by useForm hook, this object contains the current state of form when the form is controlled or debounced.
 */
export type State<T> = {
   readonly values: T
   readonly errors: Errors<T>
   readonly touched: Touched<T>
}

/**
 * contains all properties of a object that useForm return.
 */
export type UseFormReturnType<T> = {
   /** set a new state in a form,(values, errors and touched) */
   setForm: (next: ChangeState<State<T>>) => void
   /** reset all form state (values, errors and touched) */
   resetForm: () => void

   /** set fields value, change just field values */
   setFieldsValue: (next: ChangeState<T>) => void
   /** set a value in a specific field */
   setFieldValue: (path: Paths<T>, value: any) => void
   /** reset all field values */
   resetFieldsValue: () => void
   /** reset the value of a specific field */
   resetFieldValue: (path: Paths<T>) => void

   /** set all fields as touched */
   setFieldsTouched: (next: ChangeState<Touched<T>>) => void
   /** set specif field as touched */
   setFieldTouched: (path: Paths<T>, value: boolean) => void
   /** reset all fields touched */
   resetFieldsTouched: () => void
   /** reset a specific  touched value*/
   resetFieldTouched: (path: Paths<T>) => void

   /** set an error in a specific field */
   setFieldError: (path: Paths<T>, error: any) => void
   /** set errors in all fields */
   setFieldsError: (next: ChangeState<Errors<T>>) => void
   /** reset specific field error */
   resetFieldError: (path: Paths<T>) => void
   /** reset all fields error */
   resetFieldsError: () => void

   /** the state of form */
   state: State<T>
   /** this function register a input */
   register: Register
   /** ran when the event submit is dispatched */
   onSubmit: (fn: (values: T, isValid: boolean) => void) => HandleSubmit
}

/** this function register a input */
type Register = (path: string) => RegisterReturn

/** abstraction of react event change */
export type Change = React.ChangeEvent<HTMLInputElement>

type ChangeState<T> = T | ((state: T) => T)
/** ran when the event submit is dispatched */
type HandleSubmit = (e: React.BaseSyntheticEvent) => Promise<any>

/** paths are the parameter that register function receives, that type needs more improvements */
export type Paths<T> = keyof T | string

// type Prev = [never, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, ...0[]];

// type Join<K, P> = K extends string | number ? P extends string | number ? `${K}${"" extends P ? "" : "."}${P}` : never : never;

// export type Paths<T, D extends number = 10> = [D] extends [never] ? never : T extends object ? { [K in keyof T]-?: K extends string | number ? `${K}` | Join<K, Paths<T[K], Prev[D]>> : never }[keyof T] : "";
