import { useState } from "react";
import AddServerButton from "./AddServerButton";
import { useServerContext } from "context";
import { useLocation, useNavigate } from "react-router-dom";
import { ServerType } from "model";
import ServerAvatar from "./ServerAvatar";
import { DirectMessagesAvatar } from "components";

const initializeActiveTab = (currentRoute?: string) => {
  if (currentRoute && !currentRoute.includes("@me")) {
    return currentRoute.split("/")[2];
  } else {
    return "0";
  }
};

const ServerNav = () => {
  const { servers, selectedServer, handleServerSelect } = useServerContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [active, setActive] = useState(() => initializeActiveTab(location.pathname));

  const handleClick = (id: string) => {
    if (id === "0") {
      setActive(id);
      handleServerSelect("0", selectedServer?.lastSelectedChannel ?? "");
      navigate("/channels/@me");
    }
  };

  const handleServerClick = (server: ServerType) => {
    handleServerSelect(server.id, server.lastSelectedChannel);
    setActive(server.id);
    navigate(`/channels/${server.id}/${server.lastSelectedChannel}`);
  };

  return (
    <nav className="bg-grey-800 w-[72px] shrink-0 h-full text-grey-300 pt-4 pr-2 overflow-y-scroll invisible-scroll">
      <DirectMessagesAvatar active={active} onClick={handleClick} />
      <AddServerButton />
      <div className="w-full mb-2">
        <span className="bg-grey-500 block mx-auto w-8 h-[2px]"></span>
      </div>
      {servers.map((server, index) => (
        <ServerAvatar
          key={index}
          server={server}
          active={active}
          onClick={handleServerClick}
        />
      ))}
    </nav>
  );
};

export default ServerNav;
