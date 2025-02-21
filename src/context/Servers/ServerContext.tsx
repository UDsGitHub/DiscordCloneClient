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
  const [getServers, { data: serverList }] = useLazyGetServersQuery();
  const [getChannelInfo, { data: currentChannelInfo }] =
    useLazyGetChannelInfoQuery();
  const [sendMessageToChannel] = useSendMessageToChannelMutation();
  const [selectedServer, setSelectedServer] = useState<ServerType | undefined>(
    undefined
  );
  const [servers, setServers] = useState<ServerType[]>(serverList || []);
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelType | undefined
  >(undefined);
  const { previousRoute } = useRouteTracker();

  useEffect(() => {
    const initializeSelectedChannel = async () => {
      if (
        selectedServer &&
        selectedChannel &&
        !isChannelInSelectedServer(selectedChannel.id)
      ) {
        let channelToSelect;
        if (
          selectedServer.channels.length &&
          selectedServer.lastSelectedChannel === selectedServer.channels[0].id
        ) {
          channelToSelect = selectedServer.channels[0];
        } else {
          const res = await getChannelInfo(
            selectedServer.lastSelectedChannel
          ).unwrap();
          channelToSelect = res;
        }
        setSelectedChannel(channelToSelect);
      }
    };

    initializeSelectedChannel();
  }, [selectedServer, getChannelInfo]);

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
    if (serverList) setServers(serverList);
  }, [serverList]);

  function isChannelInSelectedServer(channelId: string) {
    const foundInServerChannels = selectedServer?.channels.find(
      (channel) => channel.id === channelId
    );
    const foundInCategoryChannels = selectedServer?.categories.find(
      (category) =>
        category.channels.find((channel) => channel.id === channelId)
    );
    return selectedServer && (foundInServerChannels || foundInCategoryChannels);
  }

  function handleServerSelect(id: string, prevChannelId: string) {
    const serverToSelect = servers.find((server) => server.id === id);
    if (id === "0") {
      setSelectedServer(undefined);
      setSelectedChannel(undefined);
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

        setSelectedServer((prev) => {
          if (prev) {
            if (categoryId) {
              const newCategories = prev.categories.map((category) => {
                if (category.id === categoryId) {
                  return {
                    ...category,
                    channels: [...category.channels, newChannel],
                  };
                }
                return category;
              });
              return { ...prev, categories: newCategories };
            } else {
              const newChannels = [...prev.channels, newChannel];
              return { ...prev, channels: newChannels };
            }
          }
          return prev;
        });

        setSelectedChannel(newChannel);
      } catch (error) {
        console.log(error);
      }
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
      setSelectedServer((prev) =>
        prev
          ? {
              ...prev,
              lastSelectedChannel: channelId,
            }
          : prev
      );
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

  const handleChannelSelect = (channelId: string) => {
    if (selectedServer) {
      if (
        !currentChannelInfo ||
        (currentChannelInfo && currentChannelInfo.id !== channelId)
      ) {
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
      if (selectedChannel && selectedChannel.id !== channelId) {
        updateLastSelectedChannel(selectedServer.id, channelId);
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
        addChannelToServer,
      }}
    >
      {children}
    </ServerContext.Provider>
  );
};

export const useServerContext = () => useContext(ServerContext);

export default ServerProvider;
