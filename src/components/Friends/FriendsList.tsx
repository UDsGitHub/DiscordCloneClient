import FriendListItem from "./FriendListItem";
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
        ))}
      </ul>
    </div>
  );
};

export default FriendsList;
