import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import * as sessionActions from "./redux/session";
import "./index.css";
import store from "./redux/store";

declare global {
  interface Window {
    csrfFetch: any;
    store: any;
    sessionActions: any;
    "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__": any;
  }
}


if (import.meta.env.MODE !== "production") {
  window.store = store;
  window.sessionActions = sessionActions;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>
);
