import React from "react";
import { UseFormReturnType } from "..";
import { FormContext } from "../core/contextForm";

export function useContextForm<T>() {


   const form = React.useContext<UseFormReturnType<T>>(FormContext)


   return form

}