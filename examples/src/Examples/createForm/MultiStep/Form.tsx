import { Person, usePersonForm } from "./use-person-form";
import { Wizard } from "react-use-wizard";
import { BasicInfoStep } from "./basic-info-step";
import { AddressStep } from "./address-step";
import { Button } from "@chakra-ui/react";
import React from "react";

export function MultiForm() {
  const form = usePersonForm();

  function handleSubmit(e: Person) {
    console.log(e);
  }

  function handleReset(e: Person) { }

  console.log(form.state.errors);

  return (
    <form
      onReset={form.handleReset(handleReset)}
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <Wizard>
        <BasicInfoStep />
        <AddressStep />
      </Wizard>

      <Button type="button" onClick={form.resetForm}>
        Hard reset
      </Button>
    </form>
  );
}
