import { useServerContext } from "context/Servers";
import { ChannelType } from "model";
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isCreateServerModalOpen: boolean;
  isCreateChannelModalOpen: boolean;
  isEditChannelModalOpen: boolean;
  isDeleteChannelModalOpen: boolean;
  selectedChannelCategory?: number;
  editingChannel?: string;
  openCreateServerModal: () => void;
  closeCreateServerModal: () => void;
  openCreateChannelModal: (categoryId?: number) => void;
  closeCreateChannelModal: () => void;
  openEditChannelModal: (channelId: string) => void;
  closeEditChannelModal: () => void;
  openDeleteChannelModal: (channelId: string) => void;
  closeDeleteChannelModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isCreateServerModalOpen: false,
  isCreateChannelModalOpen: false,
  isEditChannelModalOpen: false,
  isDeleteChannelModalOpen: false,
  selectedChannelCategory: undefined,
  editingChannel: undefined,
  openCreateServerModal: () => {},
  closeCreateServerModal: () => {},
  openCreateChannelModal: () => {},
  closeCreateChannelModal: () => {},
  openEditChannelModal: () => {},
  closeEditChannelModal: () => {},
  openDeleteChannelModal: () => {},
  closeDeleteChannelModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);
  const [isEditChannelModalOpen, setIsEditChannelModalOpen] = useState(false);
  const [isDeleteChannelModalOpen, setIsDeleteChannelModalOpen] = useState(false);
  const [selectedChannelCategory, setSelectedChannelCategory] = useState<
    number | undefined
  >(undefined);
  const [editingChannel, setEditingChannel] = useState<string | undefined>(
    undefined
  );
  const { selectedServer } = useServerContext();

  const openCreateServerModal = () => setIsCreateServerModalOpen(true);
  const closeCreateServerModal = () => setIsCreateServerModalOpen(false);

  const openCreateChannelModal = (categoryId?: number) => {
    setSelectedChannelCategory(categoryId);
    setIsCreateChannelModalOpen(true);
  };
  const closeCreateChannelModal = () => {
    setSelectedChannelCategory(undefined);
    setIsCreateChannelModalOpen(false);
  };

  const openEditChannelModal = (channelId: string) => {
    if (selectedServer) {
      let eventChannel = undefined;
      eventChannel = selectedServer.channels.find(
        (channel) => channel.id === channelId
      );
      if (!eventChannel) {
        selectedServer.categories.forEach((category) => {
          const channel = category.channels.find(
            (channel) => channel.id === channelId
          );
          if (channel) {
            eventChannel = channel;
          }
        });
      }
      if (eventChannel) {
        // remember to come back and move this functionality of finding the channel from the server to the actual settings menu
        setEditingChannel(channelId);
        setIsEditChannelModalOpen(true);
      }
    }
  };

  const closeEditChannelModal = () => {
    setIsEditChannelModalOpen(false);
    setEditingChannel(undefined); 
  };

  const openDeleteChannelModal = (channelId: string) => {
    setIsDeleteChannelModalOpen(true);
    setEditingChannel(channelId)
  }

  const closeDeleteChannelModal = () => {
    setIsDeleteChannelModalOpen(false)
    setEditingChannel(undefined); 
  }

  return (
    <ModalContext.Provider
      value={{
        isCreateChannelModalOpen,
        isCreateServerModalOpen,
        isDeleteChannelModalOpen,
        isEditChannelModalOpen,
        selectedChannelCategory,
        editingChannel,
        openCreateChannelModal,
        openCreateServerModal,
        closeCreateChannelModal,
        closeCreateServerModal,
        openEditChannelModal,
        closeEditChannelModal,
        openDeleteChannelModal,
        closeDeleteChannelModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
