import { ContextMenuType, useContextMenuContext } from "context";
import { ServerModel } from "model/Servers/ServerModel";
import React from "react";

type Props = {
  server: ServerModel;
};

const ServerTitleButton = ({ server }: Props) => {
  const { showContextMenu } = useContextMenuContext();

  const handleContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.button === 2) {
      e.preventDefault();
      showContextMenu(
        ContextMenuType.serverSettings,
        [e.clientX, e.clientY],
        undefined,
        server
      );
    }
  };

  return (
    <button
      className="p-2.5 w-full shadow-md flex items-center justify-between hover:bg-grey-450"
      onContextMenu={handleContextMenu}
    >
      <p className="text-grey-300 font-bold text-sm h-7 px-1.5 flex items-center rounded-md">
        {server.name}
      </p>
      <span>
        <svg
          className="w-6 h-6 text-grey-400"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m8 10 4 4 4-4"
          />
        </svg>
      </span>
    </button>
  );
};

export default ServerTitleButton;
