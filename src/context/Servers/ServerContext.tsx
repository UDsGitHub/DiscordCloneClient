import React, { createContext, useContext, useEffect, useState } from "react";
import { ChannelMessageType, ChannelType, ServerType } from "model";
import {
  useDeleteServerChannelMutation,
  useLazyGetChannelInfoQuery,
  useLazyGetServersQuery,
  useSendMessageToChannelMutation,
} from "api";
import { useUserContext } from "context";
import { ServerModel } from "model/Servers/ServerModel";
import { useLocation } from "react-router-dom";

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

const LAST_SELECTED_CHANNELS = "lastSelectedChannels";
type LastSelectedChannelsCache = {
  [id: string]: string;
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

const getLastSelectedChannel = (selectedServer: ServerModel) => {
  const lastSelectedChannels = localStorage.getItem(LAST_SELECTED_CHANNELS);
  if (!lastSelectedChannels) return selectedServer.lastSelectedChannel;

  const parsedStore = JSON.parse(
    lastSelectedChannels
  ) as LastSelectedChannelsCache;
  return parsedStore[selectedServer.id] || selectedServer.lastSelectedChannel;
};

const updateLastSelectedChannel = (serverId: string, channelId: string) => {
  const lastSelectedChannels = localStorage.getItem(LAST_SELECTED_CHANNELS);
  if (lastSelectedChannels) {
    const parsedStore = JSON.parse(
      lastSelectedChannels
    ) as LastSelectedChannelsCache;
    localStorage.setItem(
      LAST_SELECTED_CHANNELS,
      JSON.stringify({ ...parsedStore, [serverId]: channelId })
    );
  } else {
    localStorage.setItem(
      LAST_SELECTED_CHANNELS,
      JSON.stringify({ [serverId]: channelId })
    );
  }
};

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
  const location = useLocation();
  const selectedChannel = selectedServer?.findChannelInServer(
    selectedChannelId || ""
  );

  useEffect(() => {
    const initializeServer = () => {
      if (servers.length && location) {
        const routeServerId = location.pathname.split("/")[2];
        setSelectedServer(servers.find((it) => it.id === routeServerId));
      }
    };
    const initializeSelectedChannel = async () => {
      if (selectedServer) {
        // When a server is selected, fetch its lastSelectedChannel details
        const lastChannelId = getLastSelectedChannel(selectedServer);
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

    initializeServer();
    initializeSelectedChannel();
  }, [selectedServer, servers, location.pathname]);

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
      if (selectedServer && prevChannelId !== "") {
        selectedServer.lastSelectedChannel = prevChannelId;
        updateLastSelectedChannel(selectedServer.id, prevChannelId);
      }
      setSelectedServer(undefined);
    } else if (serverToSelect) {
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
      selectedServer.lastSelectedChannel = channelId;
      updateLastSelectedChannel(selectedServer.id, channelId);
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
