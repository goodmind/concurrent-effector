import faker from "faker";
import { createStore, restoreEvent, createEvent } from "effector";

const createForm = () => {
  const updateFirstName = createEvent();
  const changeFirstName = createEvent();
  const updateLastName = createEvent();
  const changeLastName = createEvent();

  const firstName = restoreEvent(updateFirstName, faker.name.firstName());
  const lastName = restoreEvent(updateLastName, faker.name.lastName());

  return {
    updateFirstName,
    changeFirstName,
    updateLastName,
    changeLastName,
    firstName,
    lastName
  };
};

export const form = createForm();
