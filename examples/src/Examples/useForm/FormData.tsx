import { Button, Input, Select, Stack } from "@chakra-ui/react";
import { useForm } from "@createform/react";
import React from "react";
import { z } from "zod";

const validationSchema = z.object({
  name: z.string().min(6),
  lastname: z.string().min(8),
});

const data = {
  name: "juciano",
  lastname: "barbosa",
  email: "juciano@juciano.com",
  select: "option1",
  color: "",
  complex: {
    checkbox: true,
    range: 23,
    radio: "2",
  },
};

export function FormDataWay() {
  const { register, errors, getErrors, setFieldValue, getValues } = useForm({
    initialValues: data,
    onSubmit,
    onReset,
    validationSchema,
  });
  console.log(errors);

  function onSubmit(e: typeof data) {
    console.log(e);
  }

  function onReset(e: typeof data) {
    console.log(e);
  }

  return (
    <Stack p={40}>
      <h1>Form with useForm hook</h1>
      <form {...register()}>
        <Stack p={5}>
          <Input name="name" />
          <span>{errors.name}</span>
        </Stack>
        <Stack p={5}>
          <Input name="lastname" />
        </Stack>

        <Stack p={5}>
          <Input name="complex.range" type="range" />
        </Stack>

        <Stack p={5}>
          <input name="color" type="color" />
        </Stack>

        <Stack p={5}>
          <input name="complex.radio" type="radio" value="1" />
          <input name="complex.radio" type="radio" value="2" />
          <input name="complex.radio" type="radio" value="3" />
        </Stack>

        <Stack p={5}>
          <Input name="email" type="email" />
        </Stack>

        <Stack p={5}>
          <input name="complex.checkbox" type="checkbox" />
        </Stack>

        <Stack p={5}>
          <Select name="select" placeholder="Select option">
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </Select>
        </Stack>
        <Stack p={5}>
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>

      <Button onClick={() => setFieldValue("name", "juliano barbosa")}>
        Set name and lastname
      </Button>

      <Button onClick={() => setFieldValue("email", "juliano@juliano.com.br")}>
        Set email
      </Button>

      <Button
        onClick={() => {
          console.log(getValues());
        }}
      >
        Get values
      </Button>

      <Button
        onClick={() => {
          console.log(getErrors());
        }}
      >
        Get errors
      </Button>
    </Stack>
  );
}
