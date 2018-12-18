import * as React from "react";
import ReactDOM from "react-dom";
import qs from "query-string";
import "./index.css";
import { ContextApp, TraditionalApp } from "./App";
import { HooksApp } from "./hooks";
import * as serviceWorker from "./serviceWorker";

const search = qs.parse(window.location.search);

let app;

if ("context" in search) {
  app = <ContextApp />;
} else if ("hooks" in search) {
  app = <HooksApp />;
} else {
  app = <TraditionalApp />;
}

if ("concurrent" in search) {
  app = <React.ConcurrentMode>{app}</React.ConcurrentMode>;
}

const root = document.getElementById("root")

ReactDOM.createRoot(root).render(app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
