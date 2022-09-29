import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.scss";
import App from "./App";
import { store } from "./store";
import { Provider } from "react-redux";
declare global {
  interface Window {
    Cypress: any;
    store: any;
  }
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// expose store when run in Cypress
if (window.Cypress) {
  window.store = store;
}
