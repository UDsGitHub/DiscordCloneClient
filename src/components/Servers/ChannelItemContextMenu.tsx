import { useContextMenuContext, useModalContext } from "context";
import { useEffect } from "react";

type Props = {
  coord: number[];
  channelId: string;
};

const ChannelItemContextMenu = ({ coord, channelId }: Props) => {
  const {
    openChannelSettingsModal,
    openDeleteChannelModal,
    openCreateChannelModal,
    getEditingChannel,
  } = useModalContext();
  const { isVisible, hideContextMenu } = useContextMenuContext();
  const liStyles =
    "hover:bg-purple-500 hover:text-white rounded-sm px-[8px] py-[6px]";

  const editingChannel = getEditingChannel(channelId);

  const handleEditMenuClick = () => {
    openChannelSettingsModal(channelId);
    hideContextMenu();
  };

  const handleCreateTextChannelClick = () => {
    openCreateChannelModal(editingChannel?.categoryId, editingChannel?.type);
    hideContextMenu();
  };

  const handleDeleteMenuClick = () => {
    openDeleteChannelModal(channelId);
    hideContextMenu();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isVisible && !target.closest(".context-menu")) {
        hideContextMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [hideContextMenu]);

  return (
    <div
      style={{ top: `${coord[1]}px`, left: `${coord[0]}px` }}
      className="context-menu w-[188px] z-50 absolute bg-grey-800 text-grey-300 rounded-md"
    >
      <ul className="p-2 text-xs rounded-md">
        <li className={liStyles}>
          <button onClick={handleEditMenuClick}>Edit Channel</button>
        </li>
        <li className={liStyles} onClick={handleCreateTextChannelClick}>
          <button>
            Create {editingChannel?.type === 0 ? "Text" : "Voice"} Channel
          </button>
        </li>
        <li
          className={
            "hover:bg-red-600 hover:text-white rounded-sm px-[8px] py-[6px] text-red-600"
          }
        >
          <button onClick={handleDeleteMenuClick}>Delete Channel</button>
        </li>
      </ul>
    </div>
  );
};

export default ChannelItemContextMenu;
