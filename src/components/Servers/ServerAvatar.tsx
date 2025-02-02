import { ServerType } from "model";

type ServerAvatarProps = {
  server: ServerType;
  active: string;
  onClick: (server: ServerType) => void;
};

type NotificationBadgeProps = {
  notificationCount?: number;
};

const ServerAvatar = ({
  server,
  active,
  onClick,
}: ServerAvatarProps) => {
  const notificationCount = 10;

  const NotificationBadge = ({ notificationCount }: NotificationBadgeProps) => {
    return (
      <div
        className={`absolute right-0 bottom-0 p-0.5 bg-red-500 rounded-full z-10 font-bold text-center text-xs cursor-default`}
      >
        {notificationCount}
      </div>
    );
  };

  return (
    <div
      className={`w-full flex justify-center mb-2 relative [&>button]:hover:rounded-2xl [&>button]:hover:bg-purple-500 ${
        server.id !== active && "[&>span]:hover:h-6"
      }`}
    >
      <span
        className={`bg-grey-400 w-3 ${
          server.id === active ? "h-12" : "h-2"
        } duration-300 rounded-full absolute -left-[28%] top-1/2 -translate-y-1/2`}
      ></span>
      <button
        className={`h-12 w-12 duration-300 flex justify-center items-center overflow-hidden ${
          server.id === active
            ? "bg-purple-500 text-white rounded-2xl"
            : "bg-grey-500 rounded-[50%]"
        }`}
        onClick={() => onClick(server)}
      >
        {server.displayPicture ? (
          <img
            src={server.displayPicture}
            alt={server.name}
            className="object-cover"
          />
        ) : (
          server?.name
        )}
      </button>
      <NotificationBadge notificationCount={notificationCount} />
    </div>
  );
};

export default ServerAvatar;
