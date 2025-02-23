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
  handleChannelSelect: (channelId: string) => void;
  addChannelToServer: (channelId: string, categoryId?: number) => void;
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
  addChannelToServer: () => {},
});

const ServerProvider = ({ children }: ServerProviderProps) => {
  const { user } = useUserContext();
  const [getServers] = useLazyGetServersQuery();
  const [getChannelInfo] = useLazyGetChannelInfoQuery();
  const [sendMessageToChannel] = useSendMessageToChannelMutation();
  const [selectedServer, setSelectedServer] = useState<ServerType | undefined>(
    undefined
  );
  const [servers, setServers] = useState<ServerType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelType | undefined
  >(undefined);
  const { previousRoute } = useRouteTracker();

  useEffect(() => {
    const initializeSelectedChannel = async () => {
      if (selectedServer) {
        let channelToSelect;
        if (selectedChannel && isChannelInSelectedServer(selectedChannel.id)) {
          const res = await getChannelInfo(
            selectedServer.lastSelectedChannel
          ).unwrap();
          channelToSelect = res;
        } else if (selectedServer.channels.length) {
          channelToSelect = selectedServer.channels[0];
        } else if (selectedServer.categories.length) {
          const categoryWithChannels = selectedServer.categories.find(
            (category) => category.channels.length
          );
          channelToSelect = categoryWithChannels?.channels[0];
        }
        setSelectedChannel(channelToSelect);
      }
    };

    initializeSelectedChannel();
  }, [selectedServer]);

  useEffect(() => {
    if (user) {
      getServers()
        .unwrap()
        .then((data) => setServers(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  function isChannelInSelectedServer(channelId: string): boolean {
    if (selectedServer) {
      for (const channel of selectedServer.channels) {
        if (channel.id === channelId) {
          return true;
        }
      }

      for (const category of selectedServer.categories) {
        for (const channel of category.channels) {
          if (channel.id === channelId) {
            return true;
          }
        }
      }
    }
    return false;
  }

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
      if (serverToSelect) {
        setSelectedServer(serverToSelect);
      }
    }
  }

  async function addChannelToServer(channelId: string, categoryId?: number) {
    if (selectedServer) {
      try {
        const newChannel = await getChannelInfo(channelId).unwrap();

        // Update the selectedServer state
        const updatedSelectedServer = { ...selectedServer };
        if (categoryId) {
          updatedSelectedServer.categories = selectedServer.categories.map(
            (category) => {
              if (category.id === categoryId) {
                return {
                  ...category,
                  channels: [...category.channels, newChannel],
                };
              }
              return category;
            }
          );
        } else {
          updatedSelectedServer.channels = [
            ...selectedServer.channels,
            newChannel,
          ];
        }

        // Update the servers state
        const updatedServers = servers.map((server) => {
          if (server.id === selectedServer.id) {
            return updatedSelectedServer;
          }
          return server;
        });

        // Update both states
        handleChannelSelect(channelId);
        setSelectedServer(updatedSelectedServer);
        setServers(updatedServers);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function updateLastSelectedChannel(serverId: string, channelId: string) {
    if (selectedServer && channelId !== "") {
      setSelectedServer((prev) => {
        if (!prev) return prev;

        const newServer = {
          ...prev,
          lastSelectedChannel: channelId,
        };
        const updatedServers = servers.map((server) =>
          server.id === serverId ? newServer : server
        );

        setServers(updatedServers);
        return newServer;
      });
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

  const handleChannelSelect = (channelId: string) => {
    if (selectedServer) {
      getChannelInfo(channelId)
        .unwrap()
        .then((data) => {
          if (selectedChannel && selectedChannel.id !== channelId) {
            updateLastSelectedChannel(selectedServer.id, channelId);
          }
          setSelectedChannel(data);
        })
        .catch((err) => console.log(err));
      return;
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
        addChannelToServer,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => useContext(ServerContext);

export default ServerProvider;
