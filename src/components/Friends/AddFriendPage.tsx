import FriendRequestInput from "./FriendRequestInput";
import wumpusSvg from "../../assets/wumpussvg.svg";

const AddFriendPage = () => {
  return (
    <div className="text-grey-400">
      <div className="border-b-2 border-grey-500 py-5 px-[30px] leading-5">
        <h2 className="text-white font-semibold uppercase mb-2">Add Friend</h2>
        <p className="text-sm mb-4">
          You can add friends with their Discord username.
        </p>
        <FriendRequestInput />
      </div>

      <div className="flex flex-col items-center py-5 px-[30px]">
        <img src={wumpusSvg} alt="waiting on friends" className="mb-12" />
        <p>Wumpus is waiting on friends. You don’t have to though!</p>
      </div>
    </div>
  );
};

export default AddFriendPage;
