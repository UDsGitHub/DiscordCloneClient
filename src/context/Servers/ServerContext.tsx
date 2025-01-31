import React, { createContext, useContext, useEffect, useState } from "react";
import { ChannelMessageType, ChannelType, ServerType } from "model";
import {
  useLazyGetChannelInfoQuery,
  useLazyGetServersQuery,
  useSendMessageToChannelMutation,
} from "api";
import { useRouteTracker, useUserContext } from "context";

type ServerContextType = {
  servers: ServerType[];
  selectedServer?: ServerType;
  selectedChannel?: ChannelType;
  handleServerSelect: (id: string, prevChannelId: string) => void;
  updateLastSelectedChannel: (serverId: string, channelId: string) => void;
  handleChannelMessageSend: (messageContent: ChannelMessageType) => void;
  updateCurrentMessage: (channelId: string, message: string) => void;
  handleChannelSelect: (channelId: string, fetched: boolean) => void;
};

type ServerProviderProps = {
  children: React.ReactNode;
};

export const ServerContext = createContext<ServerContextType>({
  servers: [],
  selectedServer: undefined,
  handleServerSelect: () => {},
  updateLastSelectedChannel: () => {},
  handleChannelMessageSend: () => {},
  updateCurrentMessage: () => {},
  handleChannelSelect: () => {},
});

const ServerProvider = ({ children }: ServerProviderProps) => {
  const { user } = useUserContext();
  const [getServers, { data: serverList }] = useLazyGetServersQuery();
  const [getChannelInfo] = useLazyGetChannelInfoQuery();
  const [sendMessageToChannel] = useSendMessageToChannelMutation();
  const [selectedServer, setSelectedServer] = useState<ServerType | undefined>(
    undefined
  );
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelType | undefined
  >(selectedServer?.channels[0]);
  const [servers, setServers] = useState<ServerType[]>(serverList || []);
  const { previousRoute } = useRouteTracker();

  useEffect(() => {
    if (user) {
      getServers()
        .unwrap()
        .then((data) => setServers(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (selectedServer) {
      const newChannel = selectedServer.categories[0].channels.length
        ? selectedServer.categories[0].channels[0]
        : selectedServer.channels[0];
      setSelectedChannel(newChannel);
    }
  }, [selectedServer]);

  useEffect(() => {
    if (serverList) setServers(serverList)
  }, [serverList])

  function handleServerSelect(id: string, prevChannelId: string) {
    const serverToSelect = servers.find((server) => server.id === id);

    if (id === "0") {
      setSelectedServer(undefined);
    } else if (selectedServer && id !== selectedServer.id) {
      if (
        previousRoute &&
        !previousRoute.includes("@me") &&
        previousRoute !== "/login" &&
        previousRoute !== "/register"
      ) {
        const newServer = {
          ...selectedServer,
          lastSelectedChannel: previousRoute?.split("/")[2],
        };
        const newServers = servers.map((server) => {
          if (server.id === newServer.id) {
            return newServer;
          } else {
            return server;
          }
        });

        setServers(newServers);
      }
      if (serverToSelect) {
        setSelectedServer((prev) => {
          if (prev) updateLastSelectedChannel(prev.id, prevChannelId);
          return serverToSelect;
        });
      }
    } else {
      if (serverToSelect) setSelectedServer(serverToSelect);
    }
  }

  function updateLastSelectedChannel(serverId: string, channelId: string) {
    if (selectedServer && channelId !== "") {
      const newServer = {
        ...selectedServer,
        lastSelectedChannel: channelId,
      };
      const updatedServers = servers.map((server) => {
        if (server.id === serverId) {
          return newServer;
        } else {
          return server;
        }
      });
      setServers(updatedServers);
    }
  }

  function handleChannelMessageSend(messageContent: ChannelMessageType) {
    if (user) {
      try {
        sendMessageToChannel(messageContent);
      } catch (e) {
        console.log(e);
      }
    }
  }

  function updateCurrentMessage(channelId: string, message: string) {
    if (selectedServer) {
      const newChannels = selectedServer.channels.map((channel) => {
        if (channel.id === channelId) {
          const newChannel = { ...channel, currentMessage: message };
          return newChannel;
        }
        return channel;
      });
      const newServer = {
        ...selectedServer,
        channels: newChannels,
      };
      const updatedServers = servers.map((server) => {
        if (server.id === selectedServer.id) {
          return newServer;
        } else {
          return server;
        }
      });
      setServers(updatedServers);
    }
  }

  const handleChannelSelect = (channelId: string, fetched: boolean) => {
    if (selectedServer) {
      if (!fetched) {
        getChannelInfo({ serverId: selectedServer.id, channelId })
          .unwrap()
          .then((data) => {
            if (selectedChannel && selectedChannel.id !== channelId) {
              updateLastSelectedChannel(selectedServer.id, selectedChannel.id);
            }
            setSelectedChannel(data);
          })
          .catch((err) => console.log(err));
        return;
      }
      if (selectedChannel && selectedChannel.id !== channelId) {
        updateLastSelectedChannel(selectedServer.id, selectedChannel.id);
      }
      const newChannel = selectedServer.categories[0].channels.length
        ? selectedServer.categories[0].channels[0]
        : selectedServer.channels[0];
      setSelectedChannel(newChannel);
    }
  };

  return (
    <ServerContext.Provider
      value={{
        servers,
        selectedServer,
        handleServerSelect,
        updateLastSelectedChannel,
        handleChannelMessageSend,
        updateCurrentMessage,
        selectedChannel,
        handleChannelSelect,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => useContext(ServerContext);

export default ServerProvider;
