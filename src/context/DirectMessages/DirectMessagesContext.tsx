import React, { createContext, useContext, useEffect, useState } from "react";
import { DmUser, DmUserListType, Message, User } from "model";
import { useLazyGetDmUsersQuery } from "api";
import { UserContext } from "context";

type DirectMessagesContextType = {
  selectedSidebarTab: string;
  setSelectedSidebarTab: (val: string) => void;
  dmUsers: DmUserListType;
  setDmUsers: React.Dispatch<
    React.SetStateAction<Record<string, DmUser> | undefined>
  >;
  setCurrentMessage: (id: string, currentMessage: string) => void;
  sendMessage: (message: Message) => void;
};

type DirectMessagesProviderProps = {
  children: React.ReactNode;
};

export const DirectMessagesContext = createContext<DirectMessagesContextType>({
  selectedSidebarTab: "0",
  dmUsers: {},
  setSelectedSidebarTab: () => {},
  setDmUsers: () => {},
  setCurrentMessage: () => {},
  sendMessage: () => {},
});

const DirectMessagesProvider = ({ children }: DirectMessagesProviderProps) => {
  const { user } = useContext(UserContext);
  const [getDmUsers, { data: dmUserList, isLoading }] =
    useLazyGetDmUsersQuery();
  const [selectedSidebarTab, setSelectedSidebarTab] = useState("0");
  const [dmUsers, setDmUsers] = useState<DmUserListType>(
    dmUserList || {}
  );

  function buildDmUserList(data: any) {
    const result: DmUserListType = {};
    for (const key in data) {
      result[key] = {
        userId: data[key].userId,
        username: data[key].username,
        currentMessage: undefined,
        messageList: data[key].messageList,
      };
    }
    setDmUsers(result);
  }

  useEffect(() => {
    if (user) {
      getDmUsers(user.id).then((res) => buildDmUserList(res.data));
    }
  }, [user]);

  function sendMessage(message: Message) {
    // setDmUsers((prevUsers) => {
    //   // Find the index of the user in the array
    //   const toUser = prevUsers ? prevUsers[toId] : undefined;
    //   if (user && toUser) {
    //     // Clone the previous state and update the selected user's currentMessage
    //     const newMessage = {
    //       fromId: user.id,
    //       toId: toId,
    //       message
    //     }
    //     toUser.messageList = [
    //       ...toUser.messageList,
    //       message,
    //     ];
    //   }
    //   return prevUsers;
    // });
  }

  function setCurrentMessage(id: string, currentMessage: string) {
    setDmUsers((prevUsers) => {
      // Find the index of the user in the array
      const user = prevUsers ? prevUsers[id] : undefined;
      if (user) {
        // Clone the previous state and update the selected user's currentMessage

        user.currentMessage = currentMessage;
      }
      return prevUsers;
    });
  }

  // TODO create a table called messages that has different columns for whatever info is needed about a message... eg, the from userId, the to userId, the text in the message
  // the links to the images in the message,... etc.

  return (
    <DirectMessagesContext.Provider
      value={{
        selectedSidebarTab,
        setSelectedSidebarTab,
        dmUsers,
        setDmUsers,
        setCurrentMessage,
        sendMessage,
      }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
};

export default DirectMessagesProvider;
