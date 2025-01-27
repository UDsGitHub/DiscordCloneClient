import { useNavigate } from "react-router-dom";
import { UserAvatar } from "../common";
import { DmUser } from "model";

type Props = {
  user: DmUser;
  selectedSidebarTab: string;
  onClick: (id: string) => void;
};

const DirectMessageUser = ({ user, selectedSidebarTab, onClick }: Props) => {
    const navigate = useNavigate();
    
  const handleClick = (id: string) => {
    onClick(id);
    if (id !== "0") {
      navigate(`/channels/@me/${id}`);
    } else {
      navigate(`/channels/@me`);
    }
  };

  return (
    <li
      className={`hover:bg-grey-500 ${
        selectedSidebarTab === user.userId && "bg-grey-400/10"
      } rounded-md text-grey-400 cursor-pointer`}
      onClick={() => handleClick(user.userId)}
    >
      <button className="px-2 h-[42px] w-full flex items-center ">
        <UserAvatar />
        <p className="grow ml-3 text-left">{user.displayName}</p>
      </button>
    </li>
  );
};

export default DirectMessageUser;
