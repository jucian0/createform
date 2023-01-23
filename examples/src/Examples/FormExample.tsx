import { createForm } from '@use-form/use-form';
import { Button, Input, Stack } from '@chakra-ui/react';

const useLoginForm = createForm({
  initialValues: {
    email: 'juciano@juciano.com',
    password: '1234567',
    agree: true,
    gender: 'masculine',
  },
  mode: 'debounce',
});

export function FormExample() {
  const { state, register, handleReset, handleSubmit } = useLoginForm();

  console.log('state', state.values);

  function onSubmit(e: any) {
    console.log(e);
  }

  function onReset(e: any) {
    // console.log(e);
  }

  return (
    <Stack p={30}>
      <h1>Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} onReset={handleReset(onReset)}>
        <Input mt={5} type="text" {...register('email')} />
        <Input mt={5} type="password" {...register('password')} />
        <Input mt={5} type="checkbox" {...register('agree')} />
        <Input mt={5} type="text" {...register('location.city')} />
        <Input mt={5} type="text" {...register('location.zip')} />

        <Stack direction="row" spacing={4} justify="center" mt={5}>
          <Button type="submit">Submit</Button>
          <Button type="reset">Reset</Button>
        </Stack>
      </form>
    </Stack>
  );
}
