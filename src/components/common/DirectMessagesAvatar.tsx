import ServerAvatar from './ServerAvatar';

type DirectMessagesAvatarProps = {
  active: string;
  onClick: (server: string) => void;
};

const DirectMessagesAvatar = ({
  active,
  onClick,
}: DirectMessagesAvatarProps) => {
  return (
    <ServerAvatar
      index={"0"}
      active={active}
      onClick={onClick}
    />
  );
};

export default DirectMessagesAvatar