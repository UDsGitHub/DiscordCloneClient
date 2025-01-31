import { FriendRequest } from "model";
import PendingRequestItem from "./PendingRequestItem";
import FriendLoader from "./FriendLoader";

type Props = {
  isLoading: boolean;
  pendingRequests: FriendRequest[];
};

const PendingRequests = ({ isLoading, pendingRequests }: Props) => {
  if (isLoading) {
    return <FriendLoader />;
  }
  return (
    <div className="text-grey-400 font-semibold">
      <div className="pt-5 pb-4 border-b-[1px] border-grey-500">
        <p className="uppercase text-xs">Pending — {pendingRequests.length}</p>
      </div>
      {pendingRequests.map((friend) => (
        <PendingRequestItem friend={friend} key={friend.user.id} />
      ))}
    </div>
  );
};

export default PendingRequests;
