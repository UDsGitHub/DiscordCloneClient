import React from "react";

type TopbarProps = {
  children: React.ReactNode;
};

const Topbar = ({ children }: TopbarProps) => {
  return (
    <div className="w-full h-12 shadow-md p-2 px-4 flex items-center text-white font-bold">
      {children}
    </div>
  );
};

export default Topbar;
