import React from "react";
import { useLocation } from "react-router-dom";

type SidebarProps = {
  serverName?: string;
};

const Sidebar = ({ serverName }: SidebarProps) => {
  const location = useLocation();
  const currentURL = location.pathname;
  let defaultUser = currentURL === "/channels/@me";

  const FindChat = () => {
    return (
      <div className="bg-grey-800 text-grey-400 text-sm h-7 px-1.5 flex items-center rounded-md">
        Find or start a conversation
      </div>
    );
  };

  return (
    <nav className="bg-grey-600 w-[240px] h-full shrink-0">
        {/* Top bar */}
      <button className="p-2.5 w-full">
        {defaultUser ? <FindChat /> : serverName}
      </button>
        {/* Channels */}
        <div>
            <div></div>
        </div>
    </nav>
  );
};

export default Sidebar;
