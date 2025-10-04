import { useContext, useEffect, useMemo } from "react";
import { Sidebar } from "../common";
import { DirectMessagesContext } from "context";
import DirectMessageUser from "./DirectMessageUser";
import { useNavigate } from "react-router-dom";

const DirectMessagesSidebar = () => {
  const { selectedSidebarTab, handleSidebarSelect, dmUsers } = useContext(
    DirectMessagesContext
  );
  const dmUserList = useMemo(() => dmUsers || {}, [dmUsers]);
  const navigate = useNavigate();

  const handleFriendsClick = () => {
    handleSidebarSelect("0");
    navigate("/channels/@me");
  };

  return (
    <Sidebar
      topBar={
        <button className="p-2.5 w-full shadow-md">
          <div className="bg-grey-800 text-grey-400 text-sm h-7 px-1.5 flex items-center rounded-md">
            Find or start a conversation
          </div>
        </button>
      }
    >
      <div className="p-2">
        <button
          className={`text-grey-400 w-full h-[42px] px-2 flex items-center rounded-md hover:bg-grey-500 ${
            selectedSidebarTab === "0" && "bg-grey-400/10 text-white"
          }`}
          onClick={handleFriendsClick}
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  fill="currentColor"
                  fillRule="nonzero"
                  d="M0.5,0 L0.5,1.5 C0.5,5.65 2.71,9.28 6,11.3 L6,16 L21,16 L21,14 C21,11.34 15.67,10 13,10 C13,10 12.83,10 12.75,10 C8,10 4,6 4,1.5 L4,0 L0.5,0 Z M13,0 C10.790861,0 9,1.790861 9,4 C9,6.209139 10.790861,8 13,8 C15.209139,8 17,6.209139 17,4 C17,1.790861 15.209139,0 13,0 Z"
                  transform="translate(2 4)"
                ></path>
                <path d="M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z M0,0 L24,0 L24,24 L0,24 L0,0 Z"></path>
              </g>
            </svg>
          </div>
          <span className="ml-4 grow text-left">Friends</span>
        </button>
        <div className="flex justify-between items-center font-semibold text-grey-400 px-2 mt-4">
          <p className="text-xs">DIRECT MESSAGES</p>
          <button>
            <svg
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z"
              ></path>
            </svg>
          </button>
        </div>
        <ul>
          {Object.keys(dmUserList).map((user: string) => (
            <DirectMessageUser
              key={user}
              user={dmUserList[user]}
              selectedSidebarTab={selectedSidebarTab}
              onClick={handleSidebarSelect}
            />
          ))}
        </ul>
      </div>
    </Sidebar>
  );
};

export default DirectMessagesSidebar;
