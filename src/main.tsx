import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { authApi } from "api";
import { UserProvider } from "context";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider api={authApi}>
      <UserProvider>
        <App />
      </UserProvider>
    </ApiProvider>
  </React.StrictMode>
);
