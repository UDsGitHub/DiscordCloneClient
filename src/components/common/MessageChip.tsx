import { UserAvatar } from "components";
import { parseMessageString } from "utils/chat";

type Props = {
  profileImg?: string;
  message: string;
};

const MessageChip = ({ profileImg, message }: Props) => {
  const parts = parseMessageString(message);
  return (
    <div className="flex items-center gap-4 text-white mb-2">
      {profileImg ? (
        <img src={profileImg} alt="" />
      ) : (
        <UserAvatar showStatus={false} />
      )}
      <div>
        <p className="font-semibold">UD</p>
        <div>
          {parts.map((part) =>
            part.type === "link" ? (
              <a
                key={part.key}
                href={part.value}
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline break-all"
              >
                {part.value}
              </a>
            ) : (
              <span key={part.key}>{part.value}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageChip;
