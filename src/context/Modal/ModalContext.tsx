import { useServerContext } from "context/Servers";
import { ChannelType } from "model";
import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isCreateServerModalOpen: boolean;
  isCreateChannelModalOpen: boolean;
  isDeleteChannelModalOpen: boolean;
  isChannelSettingsModalOpen: boolean;
  resetEditingChannel: boolean;
  selectedChannelCategory?: number;
  channelType: 0 | 1;
  editingChannel?: ChannelType;
  getEditingChannel: (channelId: string) => ChannelType | undefined;
  openCreateServerModal: () => void;
  closeCreateServerModal: () => void;
  openCreateChannelModal: (categoryId?: number, channelType?: 0 | 1) => void;
  closeCreateChannelModal: () => void;
  openDeleteChannelModal: (channelId: string, resetEditingChannel?: boolean) => void;
  closeDeleteChannelModal: () => void;
  openChannelSettingsModal: (channelId: string) => void;
  closeChannelSettingsModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isCreateServerModalOpen: false,
  isCreateChannelModalOpen: false,
  isDeleteChannelModalOpen: false,
  isChannelSettingsModalOpen: false,
  resetEditingChannel: true,
  selectedChannelCategory: undefined,
  channelType: 0,
  editingChannel: undefined,
  getEditingChannel: () => undefined,
  openCreateServerModal: () => {},
  closeCreateServerModal: () => {},
  openCreateChannelModal: () => {},
  closeCreateChannelModal: () => {},
  openDeleteChannelModal: () => {},
  closeDeleteChannelModal: () => {},
  openChannelSettingsModal: () => {},
  closeChannelSettingsModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);
  const [isDeleteChannelModalOpen, setIsDeleteChannelModalOpen] =
    useState(false);
  const [isChannelSettingsModalOpen, setIsChannelSettingsModalOpen] =
    useState(false);
  const [resetEditingChannel, setResetEditingChannel] =
    useState(true);
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

  const openDeleteChannelModal = (channelId: string, resetEditingChannel: boolean = true) => {
    const eventChannel = getEditingChannel(channelId)
    setResetEditingChannel(resetEditingChannel)
    if (eventChannel) {
      setEditingChannel(eventChannel);
      setIsDeleteChannelModalOpen(true);
    }
  };

  const closeDeleteChannelModal = () => {
    setIsDeleteChannelModalOpen(false);
    if (resetEditingChannel) setEditingChannel(undefined);
  };

  const openChannelSettingsModal = (channelId: string) => {
    const eventChannel = getEditingChannel(channelId)
    if (eventChannel) {
      setEditingChannel(eventChannel)
      setIsChannelSettingsModalOpen(true)
    }
  }

  const closeChannelSettingsModal = () => {
    setIsChannelSettingsModalOpen(false)
    setEditingChannel(undefined)
  }

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

  return (
    <ModalContext.Provider
      value={{
        isCreateChannelModalOpen,
        isCreateServerModalOpen,
        isDeleteChannelModalOpen,
        isChannelSettingsModalOpen,
        resetEditingChannel,
        selectedChannelCategory,
        editingChannel,
        getEditingChannel,
        channelType,
        openCreateChannelModal,
        openCreateServerModal,
        closeCreateChannelModal,
        closeCreateServerModal,
        openDeleteChannelModal,
        closeDeleteChannelModal,
        openChannelSettingsModal,
        closeChannelSettingsModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
