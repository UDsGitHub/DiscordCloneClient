import { TopbarLayout, UserAvatar } from "components";
import { DmUser } from "model";

type Props = {
  dmUser: DmUser;
};

const DMChatTopbar = ({ dmUser }: Props) => {
  return (
    <TopbarLayout>
      <div className="mx-2">
        <UserAvatar size="small" />
      </div>
      {dmUser.displayName}
    </TopbarLayout>
  );
};

export default DMChatTopbar;
