import { Topbar, UserAvatar } from "components";
import { DmUserType } from "model";

type Props = {
  dmUser: DmUserType;
};

const ChatTopbar = ({ dmUser }: Props) => {
  return (
    <Topbar>
      <div className="mx-2">
        <UserAvatar size="small" />
      </div>
      {dmUser.username}
    </Topbar>
  );
};

export default ChatTopbar;
