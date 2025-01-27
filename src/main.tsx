import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ChannelProvider,
  DirectMessagesProvider,
  ServerProvider,
  SocketProvider,
  ToastProvider,
  UserProvider,
} from "context/index.ts";
import { Provider } from "react-redux";
import store from "api/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <UserProvider>
        <ToastProvider>
          <ServerProvider>
            <ChannelProvider>
              <SocketProvider>
                <DirectMessagesProvider>
                  <App />
                </DirectMessagesProvider>
              </SocketProvider>
            </ChannelProvider>
          </ServerProvider>
        </ToastProvider>
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
