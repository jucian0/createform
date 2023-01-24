import { createForm } from '@use-form/use-form';

export type Person = {
  firstName: string;
  lastName: string;
  age: number | null;
  address: {
    street: string;
    city: string;
    zipCode: string;
  };
};

export const usePersonForm = createForm({
  initialValues: {
    firstName: 'Jose',
    lastName: 'Silva',
    age: null,
    address: {
      street: '',
      city: '',
      zipCode: '13255-722',
    },
  },
  mode: 'debounce',
});
