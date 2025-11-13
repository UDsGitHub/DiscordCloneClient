import { useModalContext, useServerContext } from "context";
import { useEffect } from "react";

const DeleteChannelModal = () => {
  const {
    isDeleteChannelModalOpen: isOpen,
    closeDeleteChannelModal: onClose,
    editingChannel,
  } = useModalContext();
  const { deleteChannel } = useServerContext();

  const handleDeleteClick = () => {
    if (editingChannel) {
      deleteChannel(editingChannel.id);
      onClose()
    }
  };

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (isOpen && !target.closest(".context-menu")) {
          onClose();
        }
      };
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [onClose]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-[60] ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg overflow-hidden w-[440px] text-grey-300 text-sm`}
      >
        <div className="p-4 bg-grey-500">
          <p className="text-lg font-bold mb-4">Delete Channel</p>
          <p className="mb-4">
            Are you sure you want to delete #{editingChannel?.name}? This cannot be
            undone
          </p>
        </div>
        <div className="p-4 bg-grey-600 flex items-center justify-end gap-6">
          <p className="hover:underline cursor-pointer" onClick={onClose}>
            Cancel
          </p>
          <button
            className="bg-red-500 text-white hover:bg-red-700/75 duration-300 h-[38px] py-0.5 px-4 rounded-sm"
            onClick={handleDeleteClick}
          >
            Delete Channel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteChannelModal;
