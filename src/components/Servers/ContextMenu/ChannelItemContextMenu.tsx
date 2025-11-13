import { useContextMenuContext, useModalContext } from "context";
import { ChannelModel, ChannelType } from "model/Servers/ChannelModel";
import { useEffect } from "react";

type Props = {
  coord: number[];
  eventChannel: ChannelModel;
};

const ChannelItemContextMenu = ({ coord, eventChannel }: Props) => {
  const {
    openChannelSettingsModal,
    openDeleteChannelModal,
    openCreateChannelModal,
  } = useModalContext();
  const { isVisible, hideContextMenu } = useContextMenuContext();
  const liStyles =
    "cursor-pointer hover:bg-purple-500 hover:text-white rounded-sm px-[8px] py-[6px]";

  const handleEditMenuClick = () => {
    openChannelSettingsModal(eventChannel);
    hideContextMenu();
  };

  const handleCreateTextChannelClick = () => {
    openCreateChannelModal(eventChannel.categoryId, eventChannel.type);
    hideContextMenu();
  };

  const handleDeleteMenuClick = () => {
    openDeleteChannelModal(eventChannel);
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
        <li className={liStyles} onClick={handleEditMenuClick}>
          Edit Channel
        </li>
        <li className={liStyles} onClick={handleCreateTextChannelClick}>
          Create {eventChannel.type === ChannelType.text ? "Text" : "Voice"} Channel
        </li>
        <li
          className={
            "cursor-pointer hover:bg-red-600 hover:text-white rounded-sm px-[8px] py-[6px] text-red-600"
          }
          onClick={handleDeleteMenuClick}
        >
          Delete Channel
        </li>
      </ul>
    </div>
  );
};

export default ChannelItemContextMenu;
