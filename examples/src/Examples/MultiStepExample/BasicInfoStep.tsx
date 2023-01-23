import { Input, Text } from '@chakra-ui/react';
import { usePersonForm } from './usePersonForm';
import { Button, Stack } from '@chakra-ui/react';
import { useWizard } from 'react-use-wizard';

export function BasicInfoStep() {
  const { previousStep, nextStep } = useWizard();
  const { register } = usePersonForm();

  return (
    <Stack p={10}>
      <Text fontWeight={'bold'}>Basic Info</Text>
      <Input mt={5} placeholder="First name" ref={register('firstName')} />
      <Input mt={5} placeholder="Last name" ref={register('lastName')} />
      <Input mt={5} placeholder="Age" type="number" ref={register('age')} />

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button type="reset">Reset</Button>
        <Button onClick={nextStep}>Next</Button>
      </Stack>
    </Stack>
  );
}
