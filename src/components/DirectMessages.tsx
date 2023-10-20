import React from "react";
import { UserAvatar, Sidebar } from "./common";

type Props = {};

type DMUserProps = {
    profileImg?: string;
    username: string;
}

const DirectMessages = (props: Props) => {
  const dmList = [..."udochukwu".toUpperCase()];

  const FindChat = () => {
    return (
      <div className="bg-grey-800 text-grey-400 text-sm h-7 px-1.5 flex items-center rounded-md">
        Find or start a conversation
      </div>
    );
  };

  const DMUser = ({username}: DMUserProps) => {
    return (
      <li className="hover:bg-grey-500 rounded-md text-grey-400">
        <button className="px-2 h-[42px] flex items-center ">
          <UserAvatar />
          <p className="grow ml-3">{username}</p>
        </button>
      </li>
    );
  }

  return (
    <Sidebar topBar={<FindChat />}>
      <div className="p-2">
        <button className="text-grey-400 w-full h-[42px] px-2 flex items-center rounded-md hover:bg-grey-500">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg
              aria-hidden="true"
              role="img"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <g fill="none" fill-rule="evenodd">
                <path
                  fill="currentColor"
                  fill-rule="nonzero"
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
          <button className="text-xl">+</button>
        </div>
        <ul>
            {dmList.map((dm, index) => <DMUser key={index} username={"Udochukwu"}/>)}
        </ul>
      </div>
    </Sidebar>
  );
};

export default DirectMessages;
