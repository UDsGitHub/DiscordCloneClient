import React, { createContext, useContext, useEffect, useState } from "react";
import { ChannelMessageType, ChannelType, ServerType } from "model";
import {
  useDeleteServerChannelMutation,
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
  deleteChannel: (channelId: string) => void;
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
  deleteChannel: () => {},
});

const ServerProvider = ({ children }: ServerProviderProps) => {
  const { user } = useUserContext();
  const [getServers, { data: serversList }] = useLazyGetServersQuery();
  const [getChannelInfo] = useLazyGetChannelInfoQuery();
  const [sendMessageToChannel] = useSendMessageToChannelMutation();
  const [deleteServerChannel] = useDeleteServerChannelMutation();
  const [selectedServer, setSelectedServer] = useState<ServerType | undefined>(
    undefined
  );
  const [selectedServerId, setSelectedServerId] = useState<string>("0");
  const [servers, setServers] = useState<ServerType[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelType | undefined
  >(undefined);
  const { previousRoute } = useRouteTracker();

  useEffect(() => {
    const serverToSelect = servers.find(
      (server) => server.id === selectedServerId
    );
    setSelectedServer(serverToSelect);
  }, [servers, selectedServerId]);

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

  useEffect(() => {
    if (serversList) setServers(serversList);
  }, [serversList]);

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
      setSelectedServerId(id);
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
        setSelectedServerId((prev) => {
          if (prev) updateLastSelectedChannel(prev, prevChannelId);
          return serverToSelect.id;
        });
      }
    } else {
      if (serverToSelect) {
        setSelectedServerId(serverToSelect.id);
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
        setSelectedServerId(updatedSelectedServer.id);
        setServers(updatedServers);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function updateLastSelectedChannel(serverId: string, channelId: string) {
    if (selectedServer && channelId !== "") {
      setSelectedServerId((prev) => {
        if (!prev) return prev;

        const updatedServers = servers.map((server) => {
          if (server.id === serverId) {
            return { ...server, lastSelectedChannel: channelId };
          }
          return server;
        });

        setServers(updatedServers);
        return prev;
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

  const deleteChannel = (channelId: string) => {
    try {
      if (selectedServer) {
        // API DELETE
        deleteServerChannel(channelId);

        // STATE DELETE
        const newServerChannels = selectedServer.channels.filter(
          (channel) => channel.id !== channelId
        );
        const channelCategory = selectedServer.categories.find((category) =>
          category.channels.find((channel) => channel.id === channelId)
        );
        let newServerCategories = selectedServer.categories;
        if (channelCategory) {
          const newChannels = channelCategory.channels.filter(
            (channel) => channel.id !== channelId
          );
          newServerCategories = selectedServer.categories.map((category) =>
            category.id === channelCategory.id
              ? { ...channelCategory, channels: newChannels }
              : category
          );
        }
        const newServer = {
          ...selectedServer,
          channels: newServerChannels,
          categories: newServerCategories,
        };
        setServers((prev) =>
          prev.map((server) =>
            server.id === newServer.id ? newServer : server
          )
        );
      }
    } catch (error) {
      console.log(error);
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
        deleteChannel,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => useContext(ServerContext);

export default ServerProvider;
