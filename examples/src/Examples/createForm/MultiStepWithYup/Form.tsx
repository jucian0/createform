import { Person, usePersonForm } from "./use-person-form";
import { Wizard } from "react-use-wizard";
import { BasicInfoStep } from "./basic-info-step";
import { AddressStep } from "./address-step";
import React from "react";

export function MultiFormWithYup() {
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
    </form>
  );
}
