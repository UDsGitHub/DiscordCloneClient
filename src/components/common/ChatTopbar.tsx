import { Topbar, UserAvatar } from "components";
import { DmUser } from "model";

type Props = {
  dmUser: DmUser;
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
