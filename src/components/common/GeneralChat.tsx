import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ChatTopbar, UserAvatar, MessageChip } from "components";
import { DirectMessagesContext, UserContext } from "context";
import MessageInput from "./MessageInput";
import { Message } from "model";
import { useLazyGetFriendsQuery } from "api";
import { useFriendState } from "hooks";

type Props = {
  isDirectMessage?: boolean;
};

const GeneralChat = ({ isDirectMessage = false }: Props) => {
  const { dmUsers, selectedSidebarTab, sendMessage } = useContext(
    DirectMessagesContext
  );
  const [getFriends, { data: friends, isLoading: isLoadingFriends }] =
    useLazyGetFriendsQuery();
  const currentDmUser = dmUsers
    ? dmUsers[selectedSidebarTab]
    : dmUsers[Object.keys(dmUsers)[0]];
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { user } = useContext(UserContext);
  const [messageList, setMessageList] = useState<Message[]>(
    currentDmUser?.messageList || []
  );
  const { sendFriendRequest, removeFriend } = useFriendState();

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
      setMessageList((prev) => [...prev, message]);
    }
  }

  useEffect(() => {
    if (dmUsers) {
      setMessageList(currentDmUser.messageList);
    }
  }, [dmUsers, selectedSidebarTab]);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    if (isDirectMessage) {
      getFriends();
    }
  }, [isDirectMessage]);

  const friendActionButtons = useMemo(() => {
    if (!isLoadingFriends && friends) {
      const isDmUserFriend = friends.find(
        (friend) => friend.id == currentDmUser.userId
      );
      
      if (!isDmUserFriend) {
        return (
          <div className="flex gap-2">
            <button
              className="bg-purple-500 text-white p-0.5 px-3 rounded-sm"
              onClick={() => sendFriendRequest(currentDmUser.userId)}
            >
              Add Friend
            </button>
            <button className="bg-red-500 text-white p-0.5 px-3 rounded-sm">
              Block
            </button>
          </div>
        );
      } else {
        return (
          <div className="flex gap-2">
            <button
              className="bg-grey-400/25 hover:bg-grey-400/50 duration-300 text-white p-0.5 px-3 rounded-sm"
              onClick={() => removeFriend(currentDmUser.userId)}
            >
              Remove Friend
            </button>
            <button className="bg-grey-400/25 hover:bg-grey-400/50 duration-300 text-white p-0.5 px-3 rounded-sm">
              Block
            </button>
          </div>
        );
      }
    }
    return (
      <div className="flex gap-2">
        <button
          className="bg-purple-500 text-white p-0.5 px-3 rounded-sm"
          onClick={() => sendFriendRequest(currentDmUser.userId)}
        >
          Add Friend
        </button>
        <button className="bg-red-500 text-white p-0.5 px-3 rounded-sm">
          Block
        </button>
      </div>
    );
  }, [friends, selectedSidebarTab]);

  return (
    <>
      <ChatTopbar dmUser={currentDmUser} />
      <div
        className="main-chat-area overflow-y-auto text-grey-400 p-4"
        ref={scrollableRef}
      >
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
            {friendActionButtons}
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
