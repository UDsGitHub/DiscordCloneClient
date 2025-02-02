import { useState } from "react";

export default function useModalState() {
  const [isCreateServerModalOpen, setIsCreateServerModalOpen] = useState(false);
  const [isCreateChannelModalOpen, setIsCreateChannelModalOpen] =
    useState(false);
  const openCreateServerModal = () => setIsCreateServerModalOpen(true);
  const closeCreateServerModal = () => setIsCreateServerModalOpen(false);
  const openCreateChannelModal = () => setIsCreateChannelModalOpen(true);
  const closeCreateChannelModal = () => setIsCreateChannelModalOpen(false);
  return {
    isCreateServerModalOpen,
    isCreateChannelModalOpen,
    openCreateServerModal,
    closeCreateServerModal,
    openCreateChannelModal,
    closeCreateChannelModal,
  };
}
