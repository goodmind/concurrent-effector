import faker from "faker";
import { createStore, createEvent } from "effector";

const update = (_, payload) => payload;

const intervals = new Set();

export function appModel() {
  const $firstName = createStore(faker.name.firstName());
  const $lastName = createStore(faker.name.lastName());

  const setFirstName = createEvent();
  const setLastName = createEvent();

  $firstName.on(setFirstName, update);
  $lastName.on(setLastName, update);

  const addIntervals = () => {
    console.log("addIntervals");
    intervals.add(
      setInterval(() => {
        setFirstName(faker.name.firstName());
        setLastName(faker.name.lastName());
      }, window.INTERVAL1_TIME || 15)
    );

    intervals.add(
      setInterval(() => {
        setFirstName("empty");
        setLastName("empty");
      }, window.INTERVAL2_TIME || 15)
    );
  };

  const stopAllIntervals = () => intervals.forEach(clearInterval);

  return {
    setFirstName,
    setLastName,
    $firstName,
    $lastName,
    addIntervals,
    stopAllIntervals
  };
}
