import { useContext, useEffect, useRef, useState } from "react";
import { ChatTopbar, UserAvatar, MessageChip } from "components";
import { DirectMessagesContext, UserContext } from "context";
import MessageInput from "./MessageInput";
import { Message } from "model";

type Props = {};

const GeneralChat = (props: Props) => {
  const { dmUsers, selectedSidebarTab, sendMessage } = useContext(
    DirectMessagesContext
  );
  const currentDmUser = dmUsers
    ? dmUsers[selectedSidebarTab]
    : dmUsers[Object.keys(dmUsers)[0]];
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);
  const [showOutline, setShowOutline] = useState(false);
  const [messageList, setMessageList] = useState<Message[]>(
    currentDmUser?.messageList || []
  );

  function handleSendMessage(messageString: string) {
    const today = new Date();
    if (user) {
      const message = {
        fromId: user.id,
        toId: currentDmUser.userId,
        message: messageString,
        timeStamp: today,
      };
      sendMessage(message);
      setMessageList(prev => [...prev, message]);
    }
  }

  useEffect(() => {
    if (dmUsers) { 
      setMessageList(currentDmUser.messageList);
    }
  }, [dmUsers, selectedSidebarTab])

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messageList])

  return (
    <>
      <ChatTopbar dmUser={currentDmUser} />
      <div className="main-chat-area overflow-y-auto text-grey-400 p-4" ref={scrollableRef}>
        <div className="mb-4">
          <UserAvatar showStatus={false} size="large" />
          <p className="text-2xl font-bold text-white">
            {currentDmUser.username}
          </p>
          <p>
            This is the beginning of your direct message history with{" "}
            <span className="text-grey-300">{currentDmUser.username}</span>
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
        {messageList.map((message, index) => (
          <MessageChip key={index} message={message.message} />
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <MessageInput
          currentUser={currentDmUser}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};

export default GeneralChat;
