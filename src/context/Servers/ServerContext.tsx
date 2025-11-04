import React, { createContext, useContext, useEffect, useState } from "react";
import { ChannelMessageType, ChannelType, ServerType } from "model";
import {
  useDeleteServerChannelMutation,
  useLazyGetChannelInfoQuery,
  useLazyGetServersQuery,
  useSendMessageToChannelMutation,
} from "api";
import { useRouteTracker, useUserContext } from "context";
import { ServerModel } from "model/Servers/ServerModel";

type ServerContextType = {
  servers: ServerType[];
  selectedServer?: ServerType;
  selectedChannel?: ChannelType;
  handleServerSelect: (id: string, prevChannelId: string) => void;
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
  handleChannelMessageSend: () => {},
  updateCurrentMessage: () => {},
  handleChannelSelect: () => {},
  addChannelToServer: () => {},
  deleteChannel: () => {},
});

const ServerProvider = ({ children }: ServerProviderProps) => {
  const { user } = useUserContext();
  const [getServers] = useLazyGetServersQuery();
  const [getChannelInfo] = useLazyGetChannelInfoQuery();
  const [sendMessageToChannel] = useSendMessageToChannelMutation();
  const [deleteServerChannel] = useDeleteServerChannelMutation();
  const [selectedServer, setSelectedServer] = useState<ServerModel | undefined>(
    undefined
  );
  const [servers, setServers] = useState<ServerModel[]>([]);
  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  const { previousRoute } = useRouteTracker();
  const selectedChannel = selectedServer?.findChannelInServer(
    selectedChannelId || ""
  );

  useEffect(() => {
    const initializeSelectedChannel = async () => {
      if (selectedServer) {
        // When a server is selected, fetch its lastSelectedChannel details
        const lastChannelId = selectedServer.lastSelectedChannel;
        const foundChannel = selectedServer.findChannelInServer(lastChannelId);
        if (lastChannelId && foundChannel) {
          if (!foundChannel.hasBeenFetched()) {
            const res = await getChannelInfo(lastChannelId, true).unwrap();
            selectedServer.updateChannelInfo(res);
          }
          setSelectedChannelId(lastChannelId);
        } else {
          // pick a sensible default if there is no lastSelectedChannel
          const firstChannel =
            selectedServer.channels[0] ||
            selectedServer.categories.find((c) => c.channels.length)
              ?.channels[0];
          if (firstChannel) setSelectedChannelId(firstChannel.id);
        }
      }
    };

    initializeSelectedChannel();
  }, [selectedServer]);

  useEffect(() => {
    if (user) {
      getServers()
        .unwrap()
        .then((data) => setServers(data.map((it) => new ServerModel(it))))
        .catch((err) => console.log(err));
    }
  }, [user]);

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
        selectedServer.lastSelectedChannel = previousRoute?.split("/")[2];
      }
      if (serverToSelect) {
        setSelectedServer((prev) => {
          if (prev) {
            prev.lastSelectedChannel = prevChannelId;
          }
          return serverToSelect;
        });
      }
    } else if (serverToSelect) {
      setSelectedServer(serverToSelect);
    }
  }

  async function addChannelToServer(channelId: string) {
    if (selectedServer) {
      try {
        const newChannel = await getChannelInfo(channelId).unwrap();
        selectedServer.addChannel(newChannel);
        handleChannelSelect(channelId);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function handleChannelMessageSend(messageContent: ChannelMessageType) {
    if (user) {
      try {
        // Optimistic update: append a temporary pending message to the channel
        const channelId = messageContent.channelId;
        if (!selectedServer) return;

        const tempId = Math.floor(Math.random() * 10000);
        // append temp message into the channel immediately
        const foundChannel = selectedServer.findChannelInServer(channelId);
        if (foundChannel) {
          selectedServer.updateChannelInfo({
            ...foundChannel,
            messages: [
              ...foundChannel.messages,
              { ...messageContent, id: tempId },
            ],
          });
        }

        // send the message via API
        sendMessageToChannel(messageContent)
          .unwrap()
          .then((res) => {
            // On success, re-fetch latest channel to reconcile authoritative state
            const foundChannel = selectedServer.findChannelInServer(channelId);
            if (foundChannel) {
              const updatedMessages = foundChannel.messages.map((it) =>
                it.id && it.id === res ? { ...it, id: res } : it
              );
              selectedServer.updateChannelInfo({
                ...foundChannel,
                messages: updatedMessages,
              });
            }
          })
          .catch((e) => {
            // On failure remove the temp message
            console.log(e);
            const foundChannel = selectedServer.findChannelInServer(channelId);
            if (foundChannel) {
              console.log("we found the channel, just failed to update it");
              const cleaned = {
                ...foundChannel,
                messages: foundChannel.messages.filter((m) => m.id != tempId),
              };
              selectedServer.updateChannelInfo(cleaned);
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  function updateCurrentMessage(channelId: string, message: string) {
    if (!selectedServer) return;
    const foundChannel = selectedServer.findChannelInServer(channelId);
    if (foundChannel)
      selectedServer.updateChannelInfo({
        ...foundChannel,
        currentMessage: message,
      });
  }

  const handleChannelSelect = async (channelId: string) => {
    if (!selectedServer) return;

    const foundChannel = selectedServer.findChannelInServer(channelId);
    if (foundChannel) {
      if (!foundChannel.hasBeenFetched()) {
        const data = await getChannelInfo(channelId).unwrap();
        selectedServer.updateChannelInfo(data);
      }
      setSelectedChannelId(channelId);
    }
  };

  const deleteChannel = (channelId: string) => {
    try {
      if (selectedServer) {
        deleteServerChannel(channelId);
        selectedServer.deleteChannel(channelId);
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
