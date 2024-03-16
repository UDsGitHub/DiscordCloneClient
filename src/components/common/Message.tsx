import { UserAvatar } from "components";

type Props = {
  profileImg?: string;
  message: string;
};

const Message = ({ profileImg, message }: Props) => {
  return (
    <div className="flex items-center gap-4 text-white mb-2">
      {profileImg ? (
        <img src={profileImg} alt="" />
      ) : (
        <UserAvatar showStatus={false} />
      )}
      <div>
        <p className="font-semibold">UD</p>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
