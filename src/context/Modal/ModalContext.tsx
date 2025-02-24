import { useServerContext } from "context/Servers";
import { ChannelType } from "model";
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isCreateServerModalOpen: boolean;
  isCreateChannelModalOpen: boolean;
  isEditChannelModalOpen: boolean;
  isDeleteChannelModalOpen: boolean;
  selectedChannelCategory?: number;
  channelType: 0 | 1;
  editingChannel?: ChannelType;
  getEditingChannel: (channelId: string) => ChannelType | undefined;
  openCreateServerModal: () => void;
  closeCreateServerModal: () => void;
  openCreateChannelModal: (categoryId?: number, channelType?: 0 | 1) => void;
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
  channelType: 0,
  editingChannel: undefined,
  getEditingChannel: () => undefined,
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
  const [isDeleteChannelModalOpen, setIsDeleteChannelModalOpen] =
    useState(false);
  const [selectedChannelCategory, setSelectedChannelCategory] = useState<
    number | undefined
  >(undefined);
  const [editingChannel, setEditingChannel] = useState<ChannelType | undefined>(
    undefined
  );
  const [channelType, setChannelType] = useState<0 | 1>(0);
  const { selectedServer } = useServerContext();

  const openCreateServerModal = () => setIsCreateServerModalOpen(true);
  const closeCreateServerModal = () => setIsCreateServerModalOpen(false);

  const openCreateChannelModal = (categoryId?: number, channelType?: 0 | 1) => {
    setSelectedChannelCategory(categoryId);
    setChannelType(channelType ?? 0);
    setIsCreateChannelModalOpen(true);
  };
  const closeCreateChannelModal = () => {
    setSelectedChannelCategory(undefined);
    setIsCreateChannelModalOpen(false);
  };

  const openEditChannelModal = (channelId: string) => {
    const eventChannel = getEditingChannel(channelId);
    if (eventChannel) {
      setEditingChannel(eventChannel);
      setIsEditChannelModalOpen(true);
    }
  };

  const getEditingChannel = (channelId: string) => {
    let eventChannel = undefined;
    if (selectedServer) {
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
    }
    return eventChannel;
  };

  const closeEditChannelModal = () => {
    setIsEditChannelModalOpen(false);
    setEditingChannel(undefined);
  };

  const openDeleteChannelModal = (channelId: string) => {
    const eventChannel = getEditingChannel(channelId)
    if (eventChannel) {
      setEditingChannel(eventChannel);
      setIsDeleteChannelModalOpen(true);
    }
  };

  const closeDeleteChannelModal = () => {
    setIsDeleteChannelModalOpen(false);
    setEditingChannel(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isCreateChannelModalOpen,
        isCreateServerModalOpen,
        isDeleteChannelModalOpen,
        isEditChannelModalOpen,
        selectedChannelCategory,
        editingChannel,
        getEditingChannel,
        openCreateChannelModal,
        openCreateServerModal,
        closeCreateChannelModal,
        closeCreateServerModal,
        openEditChannelModal,
        closeEditChannelModal,
        openDeleteChannelModal,
        closeDeleteChannelModal,
        channelType,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
