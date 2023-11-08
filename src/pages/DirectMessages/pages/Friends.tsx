import React from "react";
import { FriendsTopbar, UserAvatar } from "../../../components";

type Props = {};
type FriendListItemProps = {
  friend: string;
};

const Friends = (props: Props) => {
  const friendsList = Array(4).fill("Udochukwu");

  const FriendListItem = ({ friend }: FriendListItemProps) => {
    return (
      <li className="p-2 hover:bg-grey-400/10 rounded-md flex items-center cursor-pointer">
        <UserAvatar />
        <div className="ml-2">
          <p className="text-white font-semibold">{friend}</p>
          <p>Online</p>
        </div>
        <button className="ml-auto h-9 w-9 flex justify-center items-center">
          <svg
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              fill="currentColor"
              d="M4.79805 3C3.80445 3 2.99805 3.8055 2.99805 4.8V15.6C2.99805 16.5936 3.80445 17.4 4.79805 17.4H7.49805V21L11.098 17.4H19.198C20.1925 17.4 20.998 16.5936 20.998 15.6V4.8C20.998 3.8055 20.1925 3 19.198 3H4.79805Z"
            ></path>
          </svg>
        </button>
        <button className="ml-2 h-9 w-9 flex justify-center items-center">
          <svg
            aria-hidden="true"
            role="img"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M18.4 4L12 10.4L5.6 4L4 5.6L10.4 12L4 18.4L5.6 20L12 13.6L18.4 20L20 18.4L13.6 12L20 5.6L18.4 4Z"
            ></path>
          </svg>
        </button>
      </li>
    );
  };

  
  return (
    <>
      <FriendsTopbar />
      <div className="grow flex flex-col px-4 pt-4">
        <div className="text-grey-400 pl-5 relative">
          <input
            className="h-8 px-2 outline-none bg-grey-800 w-full rounded-sm"
            type="text"
            placeholder="Search"
          />
          <div className="w-8 h-8 absolute right-0 top-1/2 -translate-y-1/2 flex justify-center items-center pointer-events-none">
            <div className="w-5 h-5">
              <svg
                className="w-full h-full"
                aria-label="Search"
                aria-hidden="false"
                role="img"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M21.707 20.293L16.314 14.9C17.403 13.504 18 11.799 18 10C18 7.863 17.167 5.854 15.656 4.344C14.146 2.832 12.137 2 10 2C7.863 2 5.854 2.832 4.344 4.344C2.833 5.854 2 7.863 2 10C2 12.137 2.833 14.146 4.344 15.656C5.854 17.168 7.863 18 10 18C11.799 18 13.504 17.404 14.9 16.314L20.293 21.706L21.707 20.293ZM10 16C8.397 16 6.891 15.376 5.758 14.243C4.624 13.11 4 11.603 4 10C4 8.398 4.624 6.891 5.758 5.758C6.891 4.624 8.397 4 10 4C11.603 4 13.109 4.624 14.242 5.758C15.376 6.891 16 8.398 16 10C16 11.603 15.376 13.11 14.242 14.243C13.109 15.376 11.603 16 10 16Z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <p className="text-xs font-semibold text-grey-400 pl-5 mt-5 mb-2">
          ONLINE — 1
        </p>
        <ul className="text-grey-400 invisible-scroll">
          {friendsList.map((friend, index) => (
            <FriendListItem friend={friend} key={index} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Friends;
