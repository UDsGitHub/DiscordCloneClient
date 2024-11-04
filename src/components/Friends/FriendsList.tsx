import FriendListItem from "./FriendListItem";
<<<<<<< HEAD
import { useContext } from "react";
import { DirectMessagesContext } from "context";

const FriendsList = () => {
  const { dmUsers } = useContext(DirectMessagesContext);

  // TODO: filter the dmUsers for online vs all based on the user statuses

  return (
    <div className="grow flex flex-col px-4 pt-4">
      <div className="text-grey-400 pl-4 relative">
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
        {Object.keys(dmUsers).map((friend: string) => (
          <FriendListItem friend={dmUsers[friend]} key={friend} />
=======
import { User } from "model";
import { FriendLoader } from "components";

interface FriendsListProps {
  friends: User[];
  isLoading: boolean;
}

const FriendsList = ({ friends, isLoading }: FriendsListProps) => {
  // TODO: filter the dmUsers for online vs all based on the user statuses
  if (isLoading) {
    return <FriendLoader />;
  }

  return (
    <div className="grow flex flex-col">
      <p className="text-xs font-semibold text-grey-400 mt-5 mb-2">
        ONLINE — {friends.length}
      </p>
      <ul className="text-grey-400 invisible-scroll">
        {friends.map((friend) => (
          <FriendListItem friend={friend} key={friend.id} />
>>>>>>> add-friends-page
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
