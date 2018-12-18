import faker from "faker";
import { createStore, restoreEvent, createEvent } from "effector";

const createForm = () => {
  const updateFirstName = createEvent();
  const changeFirstName = createEvent();
  const updateLastName = createEvent();
  const changeLastName = createEvent();

  (window.events || (window.events = {})).updateFirstName = updateFirstName;
  (window.events || (window.events = {})).changeFirstName = changeFirstName;
  (window.events || (window.events = {})).updateLastName = updateLastName;
  (window.events || (window.events = {})).changeLastName = changeLastName;

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
