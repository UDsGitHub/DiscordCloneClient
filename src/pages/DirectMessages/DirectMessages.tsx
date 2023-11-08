import React, { useContext } from "react";
import { DirectMessagesSidebar, GeneralChat } from "../../components";
import { Friends } from ".";
import { DirectMessagesContext } from "../../context/DirectMessages/DirectMessagesContext";

type DirectMessagesProps = {};

const DirectMessages = (props: DirectMessagesProps) => {
  const { selectedSidebarTab } = useContext(DirectMessagesContext);
  
  return (
    <>
      <DirectMessagesSidebar />
      <div className="grow flex flex-col">
        {selectedSidebarTab === 0 ? <Friends /> : <GeneralChat />}
      </div>
    </>
  );
};

export default DirectMessages;
