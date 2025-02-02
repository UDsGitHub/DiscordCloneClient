import { useEffect, useRef, useState } from "react";
import { MessageChip } from "components";
import { useServerContext, useUserContext } from "context";
import { ChannelMessageType, ChannelType } from "model";
import ChannelTopBar from "./ChannelTopBar";
import ChannelMessageInput from "./ChannelMessageInput";

interface ServerChannelChatProps {
  channel: ChannelType;
}

const ServerChannelChat = ({ channel }: ServerChannelChatProps) => {
  const { user } = useUserContext();
  const { handleChannelMessageSend } =
    useServerContext();
  const [messageList, setMessageList] = useState<ChannelMessageType[]>(
    channel.messages
  );
  const scrollableRef = useRef<HTMLDivElement>(null);

  function handleSendMessage(messageString: string) {
    if (user) {
      const message = {
        channelId: channel.id,
        author: { userId: user.id, displayName: user.displayName },
        content: messageString,
        timeStamp: new Date(),
        refMessageId: undefined,
      };
      handleChannelMessageSend(message);
      setMessageList((prev) => [...prev, message]);
    }
  }

  useEffect(() => {
    setMessageList(channel.messages);
  }, [channel]);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messageList]);

  return (
    <>
      <ChannelTopBar channelName={channel.name} channelTopic={channel.topic} />
      <div
        className="main-chat-area overflow-y-auto text-grey-400 p-4"
        ref={scrollableRef}
      >
        <div className="mb-4">
          <div className="w-[68px] h-[68px] bg-grey-350 rounded-full flex items-center justify-center">
            <svg
              className="text-grey-300"
              x="0"
              y="0"
              aria-hidden="true"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              width="42"
              height="42"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <p className="text-grey-300 text-3xl font-bold mb-2">
            Welcome to{" "}
            <span>
              <svg
                className="w-6 h-6 inline-block"
                x="0"
                y="0"
                aria-hidden="true"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            {channel.name}!
          </p>
          <p>This is the start of the #{channel.name} channel.</p>
        </div>
        {/* Message List */}
        {messageList.map((message, index) => (
          <MessageChip key={index} message={message.content} />
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <ChannelMessageInput
          channel={channel}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};

export default ServerChannelChat;
