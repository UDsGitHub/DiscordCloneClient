import { useContext, useRef, useState } from "react";
import { ChatTopbar, UserAvatar, Message } from "components";
import { DirectMessagesContext } from "context";
import MessageInput from "./MessageInput";

type Props = {};

const GeneralChat = (props: Props) => {
  const { dmUsers, selectedSidebarTab, setCurrentMessage, sendMessage } =
    useContext(DirectMessagesContext);
  const currentUser = dmUsers
    ? dmUsers[selectedSidebarTab] : dmUsers[Object.keys(dmUsers)[0]];
  const inputRef = useRef<HTMLInputElement>(null);
  const [showOutline, setShowOutline] = useState(false);
  

  function handleFormFocus() {
    inputRef.current && inputRef.current.focus();
    setShowOutline(true);
  }

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    const today = new Date();
    // sendMessage(toId, message);
    // setCurrentMessage(currentUser.id, "");
  }

  return (
    <>
      <ChatTopbar dmUser={currentUser} />
      <div className="text-grey-400 p-4">
        <div className="mb-4">
          <UserAvatar showStatus={false} size="large" />
          <p className="text-2xl font-bold text-white">
            {currentUser.username}
          </p>
          <p>
            This is the beginning of your direct message history with{" "}
            <span className="text-grey-300">{currentUser.username}</span>
          </p>
          <div className="text-sm flex gap-4 items-center mt-4">
            <p>No servers in common</p>
            <span className="bg-grey-400/25 w-1 h-1 rounded-full"></span>
            <div className="flex gap-2">
              <button className="bg-purple-500 text-white p-0.5 px-3 rounded-sm">
                Add Friend
              </button>
              <button className="bg-red-500 text-white p-0.5 px-3 rounded-sm">
                Block
              </button>
            </div>
          </div>
        </div>

        {/* Message List */}
        {currentUser.messageList.map((message, index) => (
          <Message key={index} message={message.message} />
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <MessageInput currentUser={currentUser} />
      </div>
    </>
  );
};

export default GeneralChat;
