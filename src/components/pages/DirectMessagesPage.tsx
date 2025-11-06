import { DirectMessagesSidebar, PageLoader } from "components";
import { useDirectMessageContext } from "context";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const DirectMessagesPage = () => {
  const { isFetchingDms, selectedSidebarTab, handleSidebarSelect } = useDirectMessageContext();
  const navigate = useNavigate()

  useEffect(() => {
    if (selectedSidebarTab && selectedSidebarTab != "0") {
      navigate(`/channels/@me/${selectedSidebarTab}`);
    }
  }, [])

  if (isFetchingDms) return <PageLoader />;

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
