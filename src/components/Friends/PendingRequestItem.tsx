import { useAddFriendMutation } from "api";
import { Tooltip, UserAvatar } from "components";
import { ToastContext } from "context";
import { useFriendState } from "hooks";
import { FriendRequest, FriendRequestDirection } from "model";
import { useContext, useState } from "react";

type Props = {
  friend: FriendRequest;
};

const PendingRequestItem = ({ friend }: Props) => {
  const { showToast } = useContext(ToastContext);
  const [showUsername, setShowUsername] = useState(false);
  const [addFriend] = useAddFriendMutation();
  const { ignoreFriendRequest } = useFriendState();

  const acceptFriendRequest = () => {
    addFriend(friend.user.id)
      .unwrap()
      .catch((e) => {
        if ("status" in e && e.status >= 400) {
          showToast(e.data.message);
        }
      });
  };

  return (
    <div
      className="flex gap-3 p-3 hover:bg-grey-400/10 rounded-lg"
      onMouseEnter={() => setShowUsername(true)}
      onMouseLeave={() => setShowUsername(false)}
    >
      <UserAvatar />
      <div className="flex-1">
        <div className="flex gap-2 items-center">
          <p className="text-white">{friend.user.displayName}</p>
          {showUsername && (
            <span className="text-xs">{friend.user.username}</span>
          )}
        </div>

        <p className="text-xs">
          {friend.direction === FriendRequestDirection.incoming
            ? "Incoming"
            : "Outgoing"}{" "}
          Friend Request
        </p>
      </div>
      <div className="flex gap-2">
        {friend.direction === FriendRequestDirection.incoming && (
          <Tooltip text="Accept" direction="top">
            <button
              className="h-9 w-9 flex justify-center items-center bg-grey-700 rounded-full group-hover:text-green-600"
              onClick={acceptFriendRequest}
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
                  d="M21.7 5.3a1 1 0 0 1 0 1.4l-12 12a1 1 0 0 1-1.4 0l-6-6a1 1 0 1 1 1.4-1.4L9 16.58l11.3-11.3a1 1 0 0 1 1.4 0Z"
                ></path>
              </svg>
            </button>
          </Tooltip>
        )}
        <Tooltip text="Ignore" direction="top">
          <button
            className="h-9 w-9 flex justify-center items-center bg-grey-700 rounded-full group-hover:text-red-700"
            onClick={() => ignoreFriendRequest(friend.user.id)}
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
    </div>
  );
};

export default PendingRequestItem;
