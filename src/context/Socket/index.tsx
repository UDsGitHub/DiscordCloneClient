import React, { createContext, useContext, useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

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

export const useSocketContext = () => useContext(SocketContext)