import {
  DirectMessagesSidebar,
} from "components";
import { Outlet } from "react-router-dom";

const DirectMessagesPage = () => {

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
