import { Tooltip, UserAvatar } from "components";
import { DirectMessagesContext } from "context";
import { useFriendState } from "hooks";
import { DmUser, User } from "model";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  friend: User;
};

const FriendListItem = ({ friend }: Props) => {
  const { dmUsers, updateDMUsers, handleSidebarSelect } = useContext(
    DirectMessagesContext
  );
  const { unFriendUser } = useFriendState();
  const navigate = useNavigate();
  const buttonStyles =
    "h-9 w-9 bg-grey-700 rounded-full duration-300 hover:bg-grey-800 hover:text-white flex justify-center items-center";

  const startDirectMessage = () => {
    if (Object.keys(dmUsers).includes(friend.id)) {
      handleSidebarSelect(friend.id);
      navigate(`/channels/@me/${friend.id}`);
    }
    const dmUser: DmUser = {
      userId: friend.id,
      displayName: friend.username,
      currentMessage: "",
      messageList: [],
    };
    updateDMUsers(dmUser);
  };

  return (
    <li className="p-2 hover:bg-grey-400/10 rounded-md flex items-center cursor-pointer">
      <UserAvatar />
      <div className="ml-2 flex-1">
        <p className="text-white font-semibold">{friend.username}</p>
        <p>Online</p>
      </div>
      <div className="flex gap-2 justify-center items-center">
        <Tooltip text="Message" direction="top">
          <button
            className={`${buttonStyles}`}
            aria-label="message user"
            onClick={startDirectMessage}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 22a10 10 0 1 0-8.45-4.64c.13.19.11.44-.04.61l-2.06 2.37A1 1 0 0 0 2.2 22H12Z"
              ></path>
            </svg>
          </button>
        </Tooltip>
        <Tooltip text="Unfriend" direction="top">
          <button
            className={`${buttonStyles}`}
            onClick={() => unFriendUser(friend.id)}
            aria-label="remove friend"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M17.3 18.7a1 1 0 0 0 1.4-1.4L13.42 12l5.3-5.3a1 1 0 0 0-1.42-1.4L12 10.58l-5.3-5.3a1 1 0 0 0-1.4 1.42L10.58 12l-5.3 5.3a1 1 0 1 0 1.42 1.4L12 13.42l5.3 5.3Z"
              ></path>
            </svg>
          </button>
        </Tooltip>
      </div>
    </li>
  );
};

export default FriendListItem;
