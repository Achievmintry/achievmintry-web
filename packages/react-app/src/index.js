import React from "react";
import ReactDOM from "react-dom";
import { DappContextProvider } from "./contexts/DappContext";

import App from "./App";

ReactDOM.render(
  <DappContextProvider>
    <App />
  </DappContextProvider>,
  document.getElementById("root")
);
