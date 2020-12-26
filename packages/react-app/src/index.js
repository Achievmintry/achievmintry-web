import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { CustomThemeContextProvider } from "./contexts/CustomThemeContext";

import "./index.css"

ReactDOM.render(
  <CustomThemeContextProvider>
    <App />
    </CustomThemeContextProvider>,
  document.getElementById("root")
);
