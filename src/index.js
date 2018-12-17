import * as React from "react";
import ReactDOM from "react-dom";
import qs from "query-string";
import "./index.css";
import { ContextApp, TraditionalApp } from "./App";
import { HooksApp } from "./hooks";
import * as serviceWorker from "./serviceWorker";

const search = qs.parse(window.location.search);

console.log(React);

if ("context" in search) {
  ReactDOM.render(
    <React.ConcurrentMode>
      <ContextApp />
    </React.ConcurrentMode>,
    document.getElementById("root")
  );
} else if ("hooks" in search) {
  ReactDOM.render(
    <React.ConcurrentMode>
      <HooksApp />
    </React.ConcurrentMode>,
    document.getElementById("root")
  );
} else {
  ReactDOM.render(
    <React.ConcurrentMode>
      <TraditionalApp />
    </React.ConcurrentMode>,
    document.getElementById("root")
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
