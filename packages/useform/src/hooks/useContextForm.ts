import React from "react";
import { FormContext } from "../core/contextForm";

export function useContextForm<T>() {

   const form = React.useContext(FormContext)


   return form

}