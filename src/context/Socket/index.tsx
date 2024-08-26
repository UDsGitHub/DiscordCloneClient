import React, { createContext, useEffect, useState } from "react";
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

  useEffect(() => {
    if (!socket) {
      const serverSocket = io("http://localhost:3000/");
      setSocket(serverSocket);
  
      return () => {
        serverSocket.close();
      };
    }
  }, [socket]);

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
