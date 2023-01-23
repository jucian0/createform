import { ChakraProvider } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { PersonForm } from './Examples/MultiStepExample/Form';

export function App() {
  return (
    <ChakraProvider>
      <PersonForm />
    </ChakraProvider>
  );
}
