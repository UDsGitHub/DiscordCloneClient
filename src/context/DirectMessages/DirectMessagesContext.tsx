import React, { createContext, useState } from "react";
import { DmUserType } from "../../model";

type DirectMessagesContextType = {
  selectedSidebarTab: number;
  setSelectedSidebarTab: (val: number) => void;
  dmUsers: DmUserType[];
  setDmUsers: React.Dispatch<React.SetStateAction<DmUserType[]>>;
  setCurrentMessage: (id: number, currentMessage: string) => void;
  sendMessage: (currentUser: DmUserType) => void;
};

type DirectMessagesProviderProps = {
  children: React.ReactNode;
};

export const DirectMessagesContext = createContext<DirectMessagesContextType>({
  selectedSidebarTab: 0,
  dmUsers: [],
  setSelectedSidebarTab: () => {},
  setDmUsers: () => {},
  setCurrentMessage: () => {},
  sendMessage: () => {},
});

const DirectMessagesProvider = ({ children }: DirectMessagesProviderProps) => {
  const [selectedSidebarTab, setSelectedSidebarTab] = useState(0);
  // testing before api users
  const [dmUsers, setDmUsers] = useState<DmUserType[]>([
    { id: 1, username: "James", currentMessage: "", messageList: [] },
    { id: 2, username: "Henry", currentMessage: "", messageList: [] },
    { id: 3, username: "Martin", currentMessage: "", messageList: [] },
    { id: 4, username: "Emem", currentMessage: "", messageList: [] },
    { id: 5, username: "Obinna", currentMessage: "", messageList: [] },
  ]);

  function sendMessage(currentUser: DmUserType) {
    setDmUsers((prevUsers) => {
      // Find the index of the user in the array
      const userIndex = prevUsers.findIndex((u) => u.id === currentUser.id);
      if (userIndex !== -1) {
        // Clone the previous state and update the selected user's currentMessage
        const updatedUsers = [...prevUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          messageList: [...updatedUsers[userIndex].messageList, currentUser.currentMessage],
        };
        return updatedUsers;
      }
      return prevUsers;
    });
  }

  function setCurrentMessage(id: number, currentMessage: string) {
    setDmUsers((prevUsers) => {
      // Find the index of the user in the array
      const userIndex = prevUsers.findIndex((u) => u.id === id);
      if (userIndex !== -1) {
        // Clone the previous state and update the selected user's currentMessage
        const updatedUsers = [...prevUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          currentMessage: currentMessage,
        };
        return updatedUsers;
      }
      return prevUsers;
    });
  }

  return (
    <DirectMessagesContext.Provider
      value={{
        selectedSidebarTab,
        setSelectedSidebarTab,
        dmUsers,
        setDmUsers,
        setCurrentMessage,
        sendMessage
      }}
    >
      {children}
    </DirectMessagesContext.Provider>
  );
};

export default DirectMessagesProvider;
