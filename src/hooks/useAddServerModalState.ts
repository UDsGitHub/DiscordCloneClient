import { useState } from "react";

export default function useAddServerModalState() {
  const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
  const openAddServerModal = () => setIsAddServerModalOpen(true);
  const closeAddServerModal = () => setIsAddServerModalOpen(false);
  return { isAddServerModalOpen, openAddServerModal, closeAddServerModal };
}
