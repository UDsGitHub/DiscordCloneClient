import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";
import store from "../../api/store";
import { serverApi } from "api";

type SocketContextType = {
  socket: Socket | null;
};

type SocketProviderProps = {
  children: React.ReactNode;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
});

export const SocketProvider = ({ children }: SocketProviderProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const apiUrl = import.meta.env.VITE_BASE_API_URL || "http://localhost:3000";

  useEffect(() => {
    const serverSocket = io(apiUrl, {
      transports: ["websocket"],
    });

    serverSocket.on("connect", () => {
      console.log("Connected to server", serverSocket.id);
    });

    // Wire incoming new message events to update RTK Query cache for the channel
    serverSocket.on("message:new", (msg: any) => {
      try {
        const channelId = msg.channelId;
        if (!channelId) return;

        // Merge new message into cached channel data if present
        store.dispatch(
          serverApi.util.updateQueryData(
            "getChannelInfo",
            channelId,
            (draft: any) => {
              // avoid duplicates by id
              if (!draft.messages) draft.messages = [];
              const exists = draft.messages.find((m: any) => m.id === msg.id);
              if (!exists) {
                draft.messages.push(msg);
              }
            }
          ) as any
        );
      } catch (e) {
        // ignore errors coming from updateQueryData
      }
    });

    serverSocket.on("connect_error", (err) => {
      console.error("Connection error:", err.message);
    });

    serverSocket.on("disconnect", () => {
      console.warn("Disconnected from server");
    });

    setSocket(serverSocket);

    return () => {
      serverSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocketContext = () => useContext(SocketContext);
