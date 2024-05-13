import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/homepage.scss";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";

import reduxStore from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
const { store, persistor } = reduxStore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </PersistGate>
  </Provider>
);
