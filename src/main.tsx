import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import {
  ContextMenuProvider,
  DirectMessagesProvider,
  ModalProvider,
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
            <SocketProvider>
              <ServerProvider>
                <DirectMessagesProvider>
                  <ModalProvider>
                    <ContextMenuProvider>
                      <App />
                    </ContextMenuProvider>
                  </ModalProvider>
                </DirectMessagesProvider>
              </ServerProvider>
            </SocketProvider>
          </ToastProvider>
        </UserProvider>
    </Provider>
  </React.StrictMode>
);
