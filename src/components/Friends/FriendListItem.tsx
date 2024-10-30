import { UserAvatar } from "components";
import { DmUser } from 'model';

type Props = {
    friend: DmUser
}

const FriendListItem = ({friend}: Props) => {
  return (
    <li className="p-2 hover:bg-grey-400/10 rounded-md flex items-center cursor-pointer">
      <UserAvatar />
      <div className="ml-2">
        <p className="text-white font-semibold">{friend.username}</p>
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
}

export default FriendListItem