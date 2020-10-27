import React from "react";
import { UseFormReturnType } from "../hooks/useForm";


export const FormContext = React.createContext<UseFormReturnType<any>>(undefined)

export const FormContextProvider = FormContext.Provider

export const FormContextConsumer = FormContext.Consumer