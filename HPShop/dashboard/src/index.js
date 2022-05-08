import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Redux/store";
import { RecoilRoot } from "recoil";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <RecoilRoot>
      <App />
      </RecoilRoot>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
