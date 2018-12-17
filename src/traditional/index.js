import React from "react";
import { createComponent } from "../createComponent";
import { form } from "../store";

export const FirstNameInput = createComponent(form.firstName, (_, state) => {
  return <input onChange={form.changeFirstName} value={state} />;
});

export const LastNameInput = createComponent(form.lastName, (_, state) => {
  return <input onChange={form.changeLastName} value={state} />;
});
