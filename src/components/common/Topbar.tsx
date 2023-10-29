import React from 'react'

type TopbarProps = {
    children: React.ReactNode
}

const Topbar = ({ children }: TopbarProps) => {
  return <div className="w-full h-12 shadow-md p-2 flex">{children}</div>;
};

export default Topbar