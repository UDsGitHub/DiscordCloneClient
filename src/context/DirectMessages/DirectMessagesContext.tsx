import React, { createContext, useContext, useEffect, useState } from "react";
import { DmUser, DmUserListType, Message } from "model";
import { useLazyGetDmUsersQuery, useSendMessageToUserMutation } from "api";
import { useSocketContext, useUserContext } from "context";

type DirectMessagesContextType = {
  selectedSidebarTab: string;
  handleSidebarSelect: (id: string) => void;
  dmUsers: DmUserListType;
  updateDMUsers: (dmUser: DmUser) => void;
  setCurrentMessage: (id: string, currentMessage: string) => void;
  sendMessage: (message: Message) => void;
};

type DirectMessagesProviderProps = {
  children: React.ReactNode;
};

export const DirectMessagesContext = createContext<DirectMessagesContextType>({
  selectedSidebarTab: "0",
  dmUsers: {},
  handleSidebarSelect: () => {},
  updateDMUsers: () => {},
  setCurrentMessage: () => {},
  sendMessage: () => {},
});

const DirectMessagesProvider = ({ children }: DirectMessagesProviderProps) => {
  const { user } = useUserContext();
  const { socket } = useSocketContext();
  const [getDmUsers, { data: dmUserList }] = useLazyGetDmUsersQuery();
  const [selectedSidebarTab, setSelectedSidebarTab] = useState("0");
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
      }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
};

export const useDirectMessageContext = () => useContext(DirectMessagesContext);

export default DirectMessagesProvider;
