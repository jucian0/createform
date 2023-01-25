import { ChakraProvider } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormExample } from './Examples/FormExample';
import { PersonForm } from './Examples/MultiStepExampleYup/Form';
import { RadioAndCheckboxExample } from './Examples/RadioAndCheckbox';
//import { PersonForm } from './Examples/MultiStepExample/Form';

export function App() {
  return (
    <ChakraProvider>
      <RadioAndCheckboxExample />
    </ChakraProvider>
  );
}
