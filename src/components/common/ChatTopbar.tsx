import React from "react";
import { Topbar } from ".";

type Props = {
  dmUser: string;
};

const ChatTopbar = ({ dmUser }: Props) => {
  return <Topbar>{dmUser}</Topbar>;
};

export default ChatTopbar;
