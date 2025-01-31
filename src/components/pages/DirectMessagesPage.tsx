import {
  DirectMessagesSidebar,
  DirectMessageChat,
  FriendsPage,
} from "components";
import { useDirectMessageContext } from "context";

const DirectMessagesPage = () => {
  const { selectedSidebarTab } = useDirectMessageContext();

  return (
    <>
      <DirectMessagesSidebar />
      <div className="grow flex flex-col relative">
        {selectedSidebarTab === "0" ? <FriendsPage /> : <DirectMessageChat />}
      </div>
    </>
  );
};

export default DirectMessagesPage;
