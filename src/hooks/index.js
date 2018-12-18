import React from "react";

import nanoid from "nanoid";
import logo from "../favicon.png";
import { bindModel, useComponentModel } from "./utils";

import { appModel } from "./app-model";
import { useStore } from "./useStore";

const ids = Array.from({ length: 50 }).map(() => nanoid());

export function HooksApp() {
  const {
    setFirstName,
    setLastName,
    $firstName,
    $lastName,
    addIntervals,
    stopAllIntervals
  } = useComponentModel(HooksApp);

  const firstName = useStore($firstName);
  const lastName = useStore($lastName);

  return (
    <React.StrictMode>
      <div className="App">
        <button id="stop" onClick={stopAllIntervals}>
          stop all intervals
        </button>
        <button id="start" onClick={addIntervals}>
          add intervals
        </button>
        <h1>Hello Hooks</h1>
        <img width="100" alt="Effector" src={logo} />
        {ids.map(key => (
          <div key={key}>
            <input onChange={setFirstName} value={firstName} />
            <input onChange={setLastName} value={lastName} />
          </div>
        ))}
        <h2>Start editing to see some magic happen!</h2>
      </div>
    </React.StrictMode>
  );
}

bindModel(HooksApp, appModel);
