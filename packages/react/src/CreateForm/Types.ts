import React from "react";
import { Paths, PrimitiveValue } from "../Types";

/**
 * state is one of properties that is returned by useForm hook, this object contains the current state of form when the form is controlled or debounced.
 */
export type State<T> = {
  values: T;
  errors: Errors<T>;
  touched: Touched<T>;
  isValid: boolean;
};

/**
 * Touched type represents a touched object that has all properties of a form values, when this properties is primitive type ww convert this in a boolean,
 *  otherwise if this an object we start again validating every properties.
 */
export type Touched<Values> = {
  [k in keyof Values]?: Values[k] extends number | string | boolean | Date
    ? boolean
    : Values[k] extends Array<any>
    ? Touched<Values[k][number]>[]
    : Touched<Values[k]>;
};

/**
 * Errors type represents a errors object that has all properties of a form values, when this properties is primitive type ww convert this in a string,
 *  otherwise if this an object we start again validating every properties.
 */
export type Errors<Values> = {
  [k in keyof Values]?: Values[k] extends number | string | boolean | Date
    ? string
    : Values[k] extends Array<any>
    ? Errors<Values[k][number]>[]
    : Errors<Values[k]>;
};

export type Values<T extends CreateForm<T["initialValues"]>> =
  T["initialValues"];

/**
 * useForm hook needs an object that describe and provide some properties like initial values of form, initial errors of form, initial touched of form,
 * and needs know what kind of form, is Controlled, debounced is about that.
 */
export type CreateForm<T = {}, A = any> = {
  /** represents a initial value of form */
  readonly initialValues?: T;
  /** represents a initial values of inputs errors */
  readonly initialErrors?: Errors<T>;
  /** represents a initial values of visited inputs */
  readonly initialTouched?: Touched<T>;
  /** validation schema provided by yup */
  readonly validationSchema?: any; //YupSchema<T>

  /**
   * defines the form mode debounce, onChange or onSubmit:
   * @default "onSubmit"
   * @type "debounce" | "onChange" | "onSubmit"
   */
  readonly mode?: "debounce" | "onChange" | "onSubmit";

  /**
   * It's a function that loadData the form data, it's useful when you want to load data from a server, like editing a form.
   */
  readonly loadData?: (arg?: A) => any;

  /**
   * It's a function that will be called when the form is submitted.
   * @param args {values}
   * @returns {Promise<T>}
   * @example
   * const onSubmit = async (values) => {
   *   console.log(values);
   }
   */
  readonly onSubmit?: (values?: T) => any;

  /**
   * It's a function that will be called when the form is reset.
   * @param args any
   */
  readonly onReset?: (values?: T) => void;
};

/**
 * KeyValue type represents a key value object that has a key and a value.
 * It' helpful to use this type when you want to use a key value object as a key of an object.
 **/
export type KeyValue<T> = {
  [k: string]: T;
};

export type Checkbox = HTMLInputElement;

export type Radio = HTMLInputElement;

export type Select = HTMLSelectElement;

export type Text = HTMLInputElement;

export type TextArea = HTMLTextAreaElement;

export type PrimitiveEvent = EventTarget & {
  value: PrimitiveValue;
};

export type Field = Checkbox &
  Radio &
  Select &
  Text &
  TextArea &
  PrimitiveEvent;

export type Mode = "onChange" | "onSubmit" | "debounce";

export type HookArgs<T> = {
  onChange?: (state: T) => T | void;
  onBlur?: (state: T) => T | void;
  onSubmit?: (state: T) => T | void;
  loadDataArgs?: any;
};

export type EventChange = React.ChangeEvent<Field> & CustomEvent<Field> & Event;

export type RegisterArgs<T> =
  | (React.InputHTMLAttributes<Field> & {
      validate?: any;
      name: Paths<T>;
    })
  | Paths<T>;
