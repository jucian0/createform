import { Input } from '@chakra-ui/react';
import { Button, Stack, Text } from '@chakra-ui/react';
import { usePersonForm } from './usePersonForm';
import { useWizard } from 'react-use-wizard';

export function AddressStep() {
  const { previousStep } = useWizard();
  const { register } = usePersonForm();

  return (
    <Stack p={10}>
      <Text fontWeight={'bold'}>Address</Text>
      <Input mt={5} placeholder="Street" ref={register('address.street')} />
      <Input mt={5} placeholder="City" ref={register('address.city')} />
      <Input mt={5} placeholder="Zip Code" ref={register('address.zipCode')} />

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button onClick={previousStep}>Previous</Button>
        <Button type="reset">reset</Button>
        <Button type="submit">Submit</Button>
      </Stack>
    </Stack>
  );
}
