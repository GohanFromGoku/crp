import "./index.scss";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import process from "process";

if (process.env.NODE_ENV === "development") {
  import("../public/service-worker").then(async ({ unregister }) => {
    await unregister();
  });
} else {
  import("../public/service-worker").then(async ({ register }) => {
    await register();
  });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

export default App;
