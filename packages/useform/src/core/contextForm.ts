import React from "react";
import { UseFormReturnType } from "../hooks/useForm_TEST";


export const FormContext = React.createContext<UseFormReturnType<any>>(undefined)

export const FormContextProvider = FormContext.Provider

export const FormContextConsumer = FormContext.Consumer