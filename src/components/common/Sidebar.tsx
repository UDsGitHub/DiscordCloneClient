import React from "react";
import { useLocation } from "react-router-dom";

type SidebarProps = {
  topBar: React.ReactNode;
  children: React.ReactNode;
};

const Sidebar = ({ topBar, children }: SidebarProps) => {
  const location = useLocation();
  const currentURL = location.pathname;
  let defaultUser = currentURL === "/channels/@me";

  return (
    <div className="bg-grey-700 w-[240px] h-full shrink-0">
      {/* Top bar */}
      <button className="p-2.5 w-full shadow-md">{topBar}</button>
      {/* Channels */}
      <nav>{children}</nav>
    </div>
  );
};

export default Sidebar;
