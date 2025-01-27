import { useContext, useState } from "react";
import { DirectMessagesAvatar, ServerAvatar } from "../common";
import AddServerButton from "./AddServerButton";
import { ServerContext } from "context";

interface ServerNavProps {
  isAddServerModalOpen: boolean;
  openAddServerModal: () => void;
}

const ServerNav = ({
  isAddServerModalOpen,
  openAddServerModal,
}: ServerNavProps) => {
  const [active, setActive] = useState("0");
  const { servers, handleServerSelect } = useContext(ServerContext);

  const handleClick = (id: string) => {
    if (id === "0") {
      return setActive(id);
    } else {
      handleServerSelect(id);
      setActive(id);
    }
  };

  return (
    <nav className="bg-grey-800 w-[72px] shrink-0 h-full text-grey-300 pt-4 pr-2 overflow-y-scroll invisible-scroll">
      <DirectMessagesAvatar active={active} onClick={handleClick} />
      <AddServerButton
        isAddServerModalOpen={isAddServerModalOpen}
        openAddServerModal={openAddServerModal}
      />
      <div className="w-full mb-2">
        <span className="bg-grey-500 block mx-auto w-8 h-[2px]"></span>
      </div>
      {servers.map((server, index) => (
        <ServerAvatar
          key={index}
          server={server}
          index={server.id}
          active={active}
          onClick={handleClick}
        />
      ))}
    </nav>
  );
};

export default ServerNav;
