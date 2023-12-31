import React, { useContext } from "react";
import { ChatTopbar } from ".";
import { DirectMessagesContext } from "../context/DirectMessages/DirectMessagesContext";

type Props = {};

const GeneralChat = (props: Props) => {
  const { dmUser } = useContext(DirectMessagesContext);
  return (
    <>
      <ChatTopbar dmUser={dmUser} />
      <div></div>
    </>
  );
};

export default GeneralChat;
