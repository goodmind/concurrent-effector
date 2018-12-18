import React from "react";

import faker from "faker";
import nanoid from "nanoid";
import logo from "./favicon.png";
import { form } from "./store";

import * as Context from "./context";
import * as Traditional from "./traditional";

let intervals = new Set();

console.warn(`
Please set window.INTERVAL1_TIME and window.INTERVAL2_TIME and start timers

window.INTERVAL1_TIME = 15;
window.INTERVAL1_TIME = 50;
`);

const addIntervals = () => {
  intervals.add(
    setInterval(() => {
      form.updateFirstName(faker.name.firstName());
      form.updateLastName(faker.name.lastName());
    }, window.INTERVAL1_TIME || 15)
  );
  intervals.add(
    setInterval(() => {
      form.updateFirstName("empty");
      form.updateLastName("empty");
    }, window.INTERVAL2_TIME || 50)
  );
};

const stopAllIntervals = () => intervals.forEach(clearInterval);

(window.events || (window.events = {})).addIntervals = addIntervals;
(window.events || (window.events = {})).stopAllIntervals = stopAllIntervals;

const ids = Array.from({ length: 50 }).map(() => nanoid());

export function ContextApp() {
  return (
    <React.StrictMode>
      <Context.StoreProvider>
        <div className="App">
          <button id="stop" onClick={stopAllIntervals}>
            stop all intervals
          </button>
          <button id="start" onClick={addIntervals}>
            add intervals
          </button>
          <h1>Hello Context</h1>
          <img width="100" alt="Effector" src={logo} />
          {ids.map(key => (
            <div key={key}>
              <Context.FirstNameInput />
              <Context.LastNameInput />
            </div>
          ))}
          <h2>Start editing to see some magic happen!</h2>
        </div>
      </Context.StoreProvider>
    </React.StrictMode>
  );
}

export function TraditionalApp() {
  return (
    <React.StrictMode>
      <div className="App">
        <button id="stop" onClick={stopAllIntervals}>
          stop all intervals
        </button>
        <button id="start" onClick={addIntervals}>
          add intervals
        </button>
        <h1>Hello Traditional</h1>
        <img width="100" alt="Effector" src={logo} />
        {ids.map(key => (
          <div key={key}>
            <Traditional.FirstNameInput />
            <Traditional.LastNameInput />
          </div>
        ))}
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </React.StrictMode>
  );
}
