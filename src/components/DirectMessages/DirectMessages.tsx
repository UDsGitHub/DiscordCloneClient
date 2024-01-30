import { useContext } from "react";
import { DirectMessagesSidebar, GeneralChat, Friends } from "components";
import { DirectMessagesContext } from "context";

const DirectMessages = () => {
  const { selectedSidebarTab } = useContext(DirectMessagesContext);
  
  return (
    <>
      <DirectMessagesSidebar />
      <div className="grow flex flex-col relative">
        {selectedSidebarTab === 0 ? <Friends /> : <GeneralChat />}
      </div>
    </>
  );
};

export default DirectMessages;
