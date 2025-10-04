import {
  DirectMessagesSidebar,
  DirectMessageChat,
  FriendsPage,
} from "components";
import { useDirectMessageContext } from "context";
import { Outlet } from "react-router-dom";

const DirectMessagesPage = () => {
  const { selectedSidebarTab } = useDirectMessageContext();

  return (
    <>
      <DirectMessagesSidebar />
      <div className="grow flex flex-col relative">
        <Outlet />
      </div>
    </>
  );
};

export default DirectMessagesPage;
