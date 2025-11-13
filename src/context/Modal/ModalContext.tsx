import { ChannelModel, ChannelType } from "model/Servers/ChannelModel";
import { ServerModel } from "model/Servers/ServerModel";
import { createContext, useContext, useState } from "react";

type InviteModalContextType = {
  server: ServerModel;
  channel?: ChannelModel;
};

interface ModalContextType {
  isCreateServerModalOpen: boolean;
  isCreateChannelModalOpen: boolean;
  isDeleteChannelModalOpen: boolean;
  isChannelSettingsModalOpen: boolean;
  isCreateCategoryModalOpen: boolean;
  isInviteModalOpen: boolean;
  resetEditingChannel: boolean;
  selectedChannelCategory?: number;
  channelType?: ChannelType;
  editingChannel?: ChannelModel;
  eventServer?: ServerModel;
  inviteModalContext?: InviteModalContextType;
  openCreateServerModal: () => void;
  closeCreateServerModal: () => void;
  openCreateChannelModal: (categoryId?: number, channelType?: 0 | 1) => void;
  closeCreateChannelModal: () => void;
  openDeleteChannelModal: (
    eventChannel: ChannelModel,
    resetEditingChannel?: boolean
  ) => void;
  closeDeleteChannelModal: () => void;
  openChannelSettingsModal: (eventChannel: ChannelModel) => void;
  closeChannelSettingsModal: () => void;
  openCreateCategoryModal: (eventServer: ServerModel) => void;
  closeCreateCategoryModal: () => void;
  openInviteModal: (server: ServerModel, channel?: ChannelModel) => void;
  closeInviteModal: () => void;
}

export const ModalContext = createContext<ModalContextType>({
  isCreateServerModalOpen: false,
  isCreateChannelModalOpen: false,
  isDeleteChannelModalOpen: false,
  isChannelSettingsModalOpen: false,
  isCreateCategoryModalOpen: false,
  isInviteModalOpen: false,
  resetEditingChannel: true,
  selectedChannelCategory: undefined,
  channelType: ChannelType.text,
  editingChannel: undefined,
  eventServer: undefined,
  inviteModalContext: undefined,
  openCreateServerModal: () => {},
  closeCreateServerModal: () => {},
  openCreateChannelModal: () => {},
  closeCreateChannelModal: () => {},
  openDeleteChannelModal: () => {},
  closeDeleteChannelModal: () => {},
  openChannelSettingsModal: () => {},
  closeChannelSettingsModal: () => {},
  openCreateCategoryModal: () => {},
  closeCreateCategoryModal: () => {},
  openInviteModal: () => {},
  closeInviteModal: () => {},
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);
  const [isDeleteChannelModalOpen, setIsDeleteChannelModalOpen] =
    useState(false);
  const [isChannelSettingsModalOpen, setIsChannelSettingsModalOpen] =
    useState(false);
  const [isCreateCategoryModalOpen, setIsCreateCategoryModalOpen] =
    useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [resetEditingChannel, setResetEditingChannel] = useState(true);
  const [selectedChannelCategory, setSelectedChannelCategory] = useState<
    number | undefined
  >(undefined);
  const [editingChannel, setEditingChannel] = useState<
    ChannelModel | undefined
  >(undefined);
  const [channelType, setChannelType] = useState<ChannelType | undefined>(undefined);
  const [eventServer, setEventServer] = useState<ServerModel | undefined>(
    undefined
  );
  const [inviteModalContext, setInviteModalContext] = useState<
    InviteModalContextType | undefined
  >(undefined);

  const openCreateServerModal = () => setIsCreateServerModalOpen(true);
  const closeCreateServerModal = () => setIsCreateServerModalOpen(false);

  const openCreateChannelModal = (
    categoryId?: number,
    channelType?: ChannelType
  ) => {
    setSelectedChannelCategory(categoryId);
    setChannelType(channelType ?? ChannelType.text);
    setIsCreateChannelModalOpen(true);
  };
  const closeCreateChannelModal = () => {
    setSelectedChannelCategory(undefined);
    setChannelType(undefined);
    setIsCreateChannelModalOpen(false);
  };

  const openDeleteChannelModal = (
    eventChannel: ChannelModel,
    resetEditingChannel: boolean = true
  ) => {
    setResetEditingChannel(resetEditingChannel);
    if (eventChannel) {
      setEditingChannel(eventChannel);
      setIsDeleteChannelModalOpen(true);
    }
  };

  const closeDeleteChannelModal = () => {
    setIsDeleteChannelModalOpen(false);
    if (resetEditingChannel) setEditingChannel(undefined);
  };

  const openChannelSettingsModal = (eventChannel: ChannelModel) => {
    setEditingChannel(eventChannel);
    setIsChannelSettingsModalOpen(true);
  };

  const closeChannelSettingsModal = () => {
    setIsChannelSettingsModalOpen(false);
    setEditingChannel(undefined);
  };

  const openCreateCategoryModal = (server: ServerModel) => {
    setEventServer(server);
    setIsCreateCategoryModalOpen(true);
  };

  const closeCreateCategoryModal = () => {
    setIsCreateCategoryModalOpen(false);
    setInviteModalContext(undefined);
  };

  const openInviteModal = (server: ServerModel, channel?: ChannelModel) => {
    setInviteModalContext({ server, channel });
    setIsInviteModalOpen(true);
  };

  const closeInviteModal = () => {
    setIsInviteModalOpen(false);
    setInviteModalContext(undefined);
  };

  return (
    <ModalContext.Provider
      value={{
        isCreateChannelModalOpen,
        isCreateServerModalOpen,
        isDeleteChannelModalOpen,
        isChannelSettingsModalOpen,
        isCreateCategoryModalOpen,
        isInviteModalOpen,
        resetEditingChannel,
        selectedChannelCategory,
        editingChannel,
        channelType,
        eventServer,
        inviteModalContext,
        openCreateChannelModal,
        openCreateServerModal,
        closeCreateChannelModal,
        closeCreateServerModal,
        openDeleteChannelModal,
        closeDeleteChannelModal,
        openChannelSettingsModal,
        closeChannelSettingsModal,
        openCreateCategoryModal,
        closeCreateCategoryModal,
        openInviteModal,
        closeInviteModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
