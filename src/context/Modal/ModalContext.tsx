import { createContext, useContext, useState } from "react";

interface ModalContextType {
  isCreateServerModalOpen: boolean;
  isCreateChannelModalOpen: boolean;
  openCreateServerModal: () => void;
  closeCreateServerModal: () => void;
  openCreateChannelModal: (categoryId?: number) => void;
  closeCreateChannelModal: () => void;
  channelCategory?: number;
}

export const ModalContext = createContext<ModalContextType>({
  isCreateServerModalOpen: false,
  isCreateChannelModalOpen: false,
  openCreateServerModal: () => {},
  closeCreateServerModal: () => {},
  openCreateChannelModal: () => {},
  closeCreateChannelModal: () => {},
  channelCategory: undefined,
});

const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);
  const [channelCategory, setChannelCategory] = useState<number | undefined>(
    undefined
  );
  const openCreateServerModal = () => setIsCreateServerModalOpen(true);
  const closeCreateServerModal = () => setIsCreateServerModalOpen(false);
  const openCreateChannelModal = (categoryId?: number) => {
    setChannelCategory(categoryId);
    setIsCreateChannelModalOpen(true);
  };
  const closeCreateChannelModal = () => {
    setChannelCategory(undefined);
    setIsCreateChannelModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isCreateChannelModalOpen,
        isCreateServerModalOpen,
        openCreateChannelModal,
        openCreateServerModal,
        closeCreateChannelModal,
        closeCreateServerModal,
        channelCategory,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);

export default ModalProvider;
