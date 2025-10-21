import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormExample } from "./Examples/createForm/form-example";
import { FormDataWay } from "./Examples/useForm/form-data";
import React from "react";
import { FormZodValidation } from "./Examples/createForm/zod-validation";
export function App() {
  return (
    <ChakraProvider>
      <FormZodValidation />
    </ChakraProvider>
  );
}
