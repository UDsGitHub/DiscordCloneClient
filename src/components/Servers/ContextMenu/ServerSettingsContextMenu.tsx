import { useContextMenuContext, useModalContext } from "context";
import { ServerModel } from "model/Servers/ServerModel";
import { useEffect } from "react";

type Props = {
  coord: number[];
  eventServer: ServerModel;
};

const ServerSettingsContextMenu = ({ coord, eventServer }: Props) => {
  const { openInviteModal, openCreateChannelModal, openCreateCategoryModal } =
    useModalContext();
  const { isVisible, hideContextMenu } = useContextMenuContext();
  const liStyles =
    "cursor-pointer hover:bg-purple-500 hover:text-white rounded-sm px-[8px] py-[6px]";

  const handleInviteClick = () => {
    openInviteModal(eventServer, eventServer.getFirstChannelInServer());
    hideContextMenu();
  };

  const handleCreateTextChannelClick = () => {
    openCreateChannelModal();
    hideContextMenu();
  };

  const handleCreateCategoryClick = () => {
    openCreateCategoryModal(eventServer);
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
      <ul className="p-3 text-xs rounded-md">
        <div className="pb-3">
          <li className={liStyles} onClick={handleInviteClick}>
            Invite People
          </li>
        </div>
        <div className="w-full border-b border-grey-450"></div>
        <div className="pt-3">
          <li className={liStyles} onClick={handleCreateTextChannelClick}>
            Create Channel
          </li>
          <li className={liStyles} onClick={handleCreateCategoryClick}>
            Create Category
          </li>
        </div>
      </ul>
    </div>
  );
};

export default ServerSettingsContextMenu;
