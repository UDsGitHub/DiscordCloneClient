import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { ChannelMessageType, ChannelType, ServerType } from "model";
import {
  getChannelInfoSelector,
  selectChannelInfo,
  serverApi,
  useDeleteServerChannelMutation,
  useLazyGetChannelInfoQuery,
  useLazyGetServersQuery,
  useSendMessageToChannelMutation,
} from "api";
import { useRouteTracker, useUserContext } from "context";
import { useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";
import store from "api/store";

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
  const [selectedChannelId, setSelectedChannelId] = useState<
    string | undefined
  >(undefined);
  // fetch counter to ignore stale fetches when switching quickly
  const channelFetchCounter = useRef(0);
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
        // When a server is selected, fetch its lastSelectedChannel details
        const lastChannelId = selectedServer.lastSelectedChannel;
        const hasBeenFetched =
          useSelector(() =>
            getChannelInfoSelector(lastChannelId)(store.getState())
          ).data !== undefined;
        if (hasBeenFetched) return;
        if (lastChannelId) {
          const fetchId = ++channelFetchCounter.current;
          try {
            console.log("hereB");
            const res = await getChannelInfo(lastChannelId, true).unwrap();
            // ignore stale responses
            if (fetchId !== channelFetchCounter.current) return;

            // merge currentMessage if we already had a draft for that channel
            const existingChannel = findChannelInServer(
              selectedServer,
              lastChannelId
            )?.channel;
            const merged = existingChannel
              ? { ...res, currentMessage: existingChannel.currentMessage }
              : res;
            const updatedServers = updateServerChannel(
              selectedServer.id,
              merged,
              servers
            );
            setServers(updatedServers);
            setSelectedChannelId(lastChannelId);
          } catch (e) {
            // silently ignore fetch errors for initial load
            // console.log(e);
          }
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
        .then((data) => setServers(data))
        .catch((err) => console.log(err));
    }
  }, [user]);

  useEffect(() => {
    if (serversList) setServers(serversList);
  }, [serversList]);

  // derive selectedChannel from the selectedServer and selectedChannelId
  const selectedChannel: ChannelType | undefined = selectedServer
    ? findChannelInServer(selectedServer, selectedChannelId || "").channel
    : undefined;

  // helper to find a channel in a server (either top-level or in categories)
  function findChannelInServer(
    server: ServerType,
    channelId: string
  ): { channel?: ChannelType; categoryId?: number } {
    const channel = server.channels.find((c) => c.id === channelId);
    if (channel) return { channel };
    for (const category of server.categories) {
      const ch = category.channels.find((c) => c.id === channelId);
      if (ch) return { channel: ch, categoryId: category.id };
    }
    return {};
  }

  // helper to update a single channel inside a server and return updated servers array
  function updateServerChannel(
    serverId: string,
    newChannel: ChannelType,
    serversList: ServerType[]
  ) {
    return serversList.map((server) => {
      if (server.id !== serverId) return server;
      // shallow copy server
      const updatedServer = { ...server } as ServerType & { categories: any };
      // try top-level channels
      if (server.channels.find((c) => c.id === newChannel.id)) {
        updatedServer.channels = server.channels.map((c) =>
          c.id === newChannel.id ? newChannel : c
        );
        return updatedServer;
      }
      // try categories
      updatedServer.categories = server.categories.map((category) => {
        if (category.channels.find((c) => c.id === newChannel.id)) {
          return {
            ...category,
            channels: category.channels.map((c) =>
              c.id === newChannel.id ? newChannel : c
            ),
          };
        }
        return category;
      });
      return updatedServer;
    });
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
        setServers(updatedServers);
        // select the new channel and ensure server holds full detail
        handleChannelSelect(channelId);
        setSelectedServerId(updatedSelectedServer.id);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function updateLastSelectedChannel(serverId: string, channelId: string) {
    if (selectedServer && channelId !== "") {
      setSelectedServerId((prev) => {
        if (!prev) return prev;
        const updatedServers = servers.map((server) =>
          server.id === serverId
            ? { ...server, lastSelectedChannel: channelId }
            : server
        );
        setServers(updatedServers);
        return prev;
      });
    }
  }

  function handleChannelMessageSend(messageContent: ChannelMessageType) {
    if (user) {
      try {
        // Optimistic update: append a temporary pending message to the channel
        const channelId = messageContent.channelId;
        if (!selectedServer) return;

        const tempId = `temp-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}`;
        const tempMessage: any = {
          id: tempId,
          channelId,
          content:
            (messageContent as any).message ??
            (messageContent as any).content ??
            "",
          author: user,
          createdAt: new Date().toISOString(),
          pending: true,
        };

        // append temp message into the channel immediately
        const existing = findChannelInServer(selectedServer, channelId).channel;
        const newChannel = existing
          ? {
              ...existing,
              messages: [...(existing.messages || []), tempMessage],
            }
          : ({ id: channelId, messages: [tempMessage] } as ChannelType);

        setServers((prev) =>
          updateServerChannel(selectedServer.id, newChannel, prev)
        );

        // send the message via API
        sendMessageToChannel(messageContent)
          .unwrap()
          .then(() => {
            // On success, re-fetch latest channel to reconcile authoritative state
            const fetchId = ++channelFetchCounter.current;
            console.log("here");
            getChannelInfo(channelId)
              .unwrap()
              .then((res) => {
                if (fetchId !== channelFetchCounter.current) return;
                const existingChannel = findChannelInServer(
                  selectedServer,
                  channelId
                )?.channel;
                const merged = existingChannel
                  ? { ...res, currentMessage: existingChannel.currentMessage }
                  : res;
                setServers((prev) =>
                  updateServerChannel(selectedServer.id, merged, prev)
                );
              })
              .catch(() => {});
          })
          .catch(() => {
            // On failure remove the temp message
            const existingChannel = findChannelInServer(
              selectedServer,
              channelId
            ).channel;
            if (existingChannel) {
              const cleaned = {
                ...existingChannel,
                messages: (existingChannel.messages || []).filter(
                  (m: any) => m.id !== tempId
                ),
              } as ChannelType;
              setServers((prev) =>
                updateServerChannel(selectedServer.id, cleaned, prev)
              );
            }
          });
      } catch (e) {
        console.log(e);
      }
    }
  }

  function updateCurrentMessage(channelId: string, message: string) {
    if (!selectedServer) return;
    const updatedChannel = {
      ...(findChannelInServer(selectedServer, channelId).channel || {
        id: channelId,
      }),
      currentMessage: message,
    } as ChannelType;
    setServers((prev) =>
      updateServerChannel(selectedServer.id, updatedChannel, prev)
    );
  }

  const handleChannelSelect = (channelId: string) => {
    if (selectedServer) {
      const fetchId = ++channelFetchCounter.current;
      console.log("hereA");
      getChannelInfo(channelId)
        .unwrap()
        .then((data) => {
          if (fetchId !== channelFetchCounter.current) return; // stale
          const existing = findChannelInServer(
            selectedServer,
            channelId
          )?.channel;
          const merged = existing
            ? { ...data, currentMessage: existing.currentMessage }
            : data;
          setServers((prev) =>
            updateServerChannel(selectedServer.id, merged, prev)
          );
          updateLastSelectedChannel(selectedServer.id, channelId);
          setSelectedChannelId(channelId);
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
