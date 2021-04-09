import * as React from "react";
import { UseFormReturnType } from "../types";


export const FormContext = React.createContext<UseFormReturnType<any>>(undefined as any)

export const FormContextProvider = FormContext.Provider

export const FormContextConsumer = FormContext.Consumer