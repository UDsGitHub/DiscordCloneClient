import React from "react";

type TopbarProps = {
  children: React.ReactNode;
};

const TopbarLayout = ({ children }: TopbarProps) => {
  return (
    <div className="w-full h-12 shadow-md p-2 px-4 flex items-center text-white">
      {children}
    </div>
  );
};

export default TopbarLayout;
