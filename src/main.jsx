import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import AuthIsReady from "./AuthIsReady";
import "./index.css";

import App from "./App";
import { store } from "./state/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
      <AuthIsReady>
        <App />
      </AuthIsReady>
    
  </Provider>
);
