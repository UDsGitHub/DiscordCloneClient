import React, { createContext, useContext, useEffect, useState } from "react";
import { DmUser, DmUserListType, Message } from "model";
import { useLazyGetDmUsersQuery, useSendMessageToUserMutation } from "api";
import { useSocketContext, useUserContext } from "context";
import { useLocation } from "react-router-dom";

type DirectMessagesContextType = {
  selectedSidebarTab: string | undefined;
  handleSidebarSelect: (id: string) => void;
  dmUsers: DmUserListType;
  updateDMUsers: (dmUser: DmUser) => void;
  setCurrentMessage: (id: string, currentMessage: string) => void;
  sendMessage: (message: Message) => void;
  isFetchingDms: boolean;
};

type DirectMessagesProviderProps = {
  children: React.ReactNode;
};

export const DirectMessagesContext = createContext<DirectMessagesContextType>({
  selectedSidebarTab: undefined,
  dmUsers: {},
  handleSidebarSelect: () => {},
  updateDMUsers: () => {},
  setCurrentMessage: () => {},
  sendMessage: () => {},
  isFetchingDms: true,
});

const LAST_SELECTED_DM = "lastSelectedDm";

const DirectMessagesProvider = ({ children }: DirectMessagesProviderProps) => {
  const { user } = useUserContext();
  const { socket } = useSocketContext();
  const { pathname } = useLocation();
  const [getDmUsers, { data: dmUserList, isLoading, isFetching }] =
    useLazyGetDmUsersQuery();
  const [selectedSidebarTab, setSelectedSidebarTab] = useState<
    string | undefined
  >(undefined);
  const [dmUsers, setDmUsers] = useState<DmUserListType>(dmUserList || {});
  const [sendMessageToUser] = useSendMessageToUserMutation();

  function buildDmUserList(data: any) {
    const result: DmUserListType = {};
    for (const key in data) {
      result[key] = {
        userId: data[key].userId,
        displayName: data[key].displayName,
        currentMessage: data[key].currentMessage,
        messageList: data[key].messageList,
      };
    }
    setDmUsers(result);
  }

  useEffect(() => {
    if (user) {
      getDmUsers().then((res) => buildDmUserList(res.data));
    }
  }, [user]);

  useEffect(() => {
    const atBase = pathname.includes("@me");
    if (isLoading || isFetching) return;

    if (Object.keys(dmUsers).length) {
      if (!selectedSidebarTab && atBase && pathname.split("/").length === 3) {
        const lastSelectedDm = localStorage.getItem(LAST_SELECTED_DM);
        if (lastSelectedDm) {
          setSelectedSidebarTab(lastSelectedDm);
        } else {
          setSelectedSidebarTab("0");
        }
      } else if (atBase && pathname.split("/").length === 4) {
        const dmId = pathname.split("/")[3];
        setSelectedSidebarTab(dmId);
        localStorage.setItem(LAST_SELECTED_DM, dmId);
      }
    } else {
      setSelectedSidebarTab("0");
    }
  }, [selectedSidebarTab, pathname, dmUsers]);

  function handleSidebarSelect(id: string) {
    setSelectedSidebarTab(id);

    if (socket) {
      if (id !== "0") {
        socket.emit("join_room", { room: id });
      } else {
        socket.emit("leave_room", { room: selectedSidebarTab });
      }
    }
  }

  function sendMessage(message: Message) {
    // TODO: on message send, emit socket event so that component can receive event and invalidate api call for refetching
    if (user) {
      sendMessageToUser({
        toUserId: message.toId,
        message: message.content,
      });
    }
  }

  function setCurrentMessage(id: string, currentMessage: string) {
    setDmUsers((prevUsers) => {
      const user = prevUsers ? prevUsers[id] : undefined;
      if (user) {
        user.currentMessage = currentMessage;
      }
      return prevUsers;
    });
  }

  function updateDMUsers(dmUser: DmUser) {
    if (!Object.keys(dmUsers).includes(dmUser.userId)) {
      setDmUsers((prevState) => ({ ...prevState, [dmUser.userId]: dmUser }));
      handleSidebarSelect(dmUser.userId);
    }
  }

  return (
    <DirectMessagesContext.Provider
      value={{
        selectedSidebarTab,
        handleSidebarSelect,
        dmUsers,
        updateDMUsers,
        setCurrentMessage,
        sendMessage,
        isFetchingDms: isFetching || isLoading
      }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
};

export const useDirectMessageContext = () => useContext(DirectMessagesContext);

export default DirectMessagesProvider;
