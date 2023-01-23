import { Person, usePersonForm } from './usePersonForm';
import { Wizard } from 'react-use-wizard';
import { BasicInfoStep } from './BasicInfoStep';
import { AddressStep } from './AddressStep';

export function PersonForm() {
  const form = usePersonForm();

  function handleSubmit(e: Person) {
    console.log(e);
  }

  function handleReset(_: React.FormEvent) {
    form.reset();
  }

  return (
    <form onReset={handleReset} onSubmit={form.handleSubmit(handleSubmit)}>
      <Wizard>
        <BasicInfoStep />
        <AddressStep />
      </Wizard>
    </form>
  );
}
