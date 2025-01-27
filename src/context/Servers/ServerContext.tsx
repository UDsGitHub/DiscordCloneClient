import React, { createContext, useContext, useEffect, useState } from "react";
import { ServerList, ServerType } from "model";
import { useLazyGetServerQuery, useLazyGetServersQuery } from "api";
import { UserContext } from "context";

type ServerContextType = {
  servers: ServerList[];
  selectedServer?: ServerType;
  handleServerSelect: (id: string) => void;
  updateLastSelectedChannel: (serverId: string, channelId: string) => void;
};

type ServerProviderProps = {
  children: React.ReactNode;
};

export const ServerContext = createContext<ServerContextType>({
  servers: [],
  selectedServer: undefined,
  handleServerSelect: () => {},
  updateLastSelectedChannel: () => {},
});

const ServerProvider = ({ children }: ServerProviderProps) => {
  const { user } = useContext(UserContext);
  const [getServers, { data: serverList }] = useLazyGetServersQuery();
  const [getServer] = useLazyGetServerQuery();
  const [selectedServer, setSelectedServer] = useState<ServerType | undefined>(
    undefined
  );
  const [servers, setServers] = useState<ServerList[]>(serverList || []);

  useEffect(() => {
    if (user) {
      getServers()
        .unwrap()
        .then((data) => setServers(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  function handleServerSelect(id: string) {
    getServer(id)
      .unwrap()
      .then((data) => setSelectedServer(data))
      .catch((err) => console.log(err));
  }

  function updateLastSelectedChannel(serverId: string, channelId: string) {
    const updatedServers = servers.map((server) => {
      if (server.id === serverId) {
        server.lastSelectedChannel = channelId;
      }
      return server;
    });
    setServers(updatedServers);
  }

  return (
    <ServerContext.Provider
      value={{
        servers,
        selectedServer,
        handleServerSelect,
        updateLastSelectedChannel,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export default ServerProvider;
