import React from "react";

type SidebarProps = {
  topBar: React.ReactNode;
  children: React.ReactNode;
};

const Sidebar = ({ topBar, children }: SidebarProps) => {
  return (
    <div className="bg-grey-700 w-[240px] h-full shrink-0">
      {/* Top bar */}
      {topBar}
      {/* Channels */}
      <nav>{children}</nav>
    </div>
  );
};

export default Sidebar;
