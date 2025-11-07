import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { UserAvatar, MessageChip } from "components";
import { DirectMessagesContext, useUserContext } from "context";
import { Message } from "model";
import { useFriendState } from "hooks";
import { useGetFriendsQuery } from "api";
import DMChatTopbar from "./DMChatTopbar";
import DirectMessagesChatInput from "./DirectMessagesChatInput";
import { useNavigate } from "react-router-dom";
import DmChatLoader from "components/common/loaders/DmChatLoader";

const DirectMessageChat = () => {
  const { user } = useUserContext();
  const { dmUsers, selectedSidebarTab, sendMessage, isFetchingDms } =
    useContext(DirectMessagesContext);
  const { data: friends, isLoading: isLoadingFriends } = useGetFriendsQuery();
  const currentDmUser = dmUsers
    ? dmUsers[selectedSidebarTab || ""] || dmUsers[Object.keys(dmUsers)[0]]
    : undefined;
  const [messageList, setMessageList] = useState<Message[]>(
    currentDmUser?.messageList || []
  );
  const { sendFriendRequest, removeFriend } = useFriendState();
  const navigate = useNavigate();
  const scrollableRef = useRef<HTMLDivElement>(null);

  function handleSendMessage(messageString: string) {
    const today = new Date();
    if (user && currentDmUser) {
      const message = {
        fromId: user.id,
        toId: currentDmUser.userId,
        content: messageString,
        timeStamp: today,
      };
      sendMessage(message);
      setMessageList((prev) => [...prev, message]);
    }
  }

  useEffect(() => {
    if (dmUsers && currentDmUser) {
      setMessageList(currentDmUser.messageList);
    }
  }, [dmUsers, selectedSidebarTab]);

  useEffect(() => {
    if (scrollableRef.current) {
      scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }
  }, [messageList]);

  useEffect(() => {
    if (
      !isFetchingDms &&
      selectedSidebarTab !== undefined &&
      dmUsers &&
      !Object.keys(dmUsers).length
    ) {
      navigate("/channels/@me");
    }
  }, [isFetchingDms, dmUsers]);

  const friendActionButtons = useMemo(() => {
    if (!isLoadingFriends && friends && currentDmUser) {
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
          onClick={() => sendFriendRequest(currentDmUser?.userId || "")}
        >
          Add Friend
        </button>
        <button className="bg-red-500 text-white p-0.5 px-3 rounded-sm">
          Block
        </button>
      </div>
    );
  }, [friends, selectedSidebarTab]);

  if (!currentDmUser) return <DmChatLoader />;

  return (
    <>
      <DMChatTopbar dmUser={currentDmUser} />
      <div
        className="main-chat-area overflow-y-auto text-grey-400 p-4"
        ref={scrollableRef}
      >
        <div className="mb-4">
          <UserAvatar showStatus={false} size="large" />
          <p className="text-2xl font-bold text-white">
            {currentDmUser.displayName}
          </p>
          <p>
            This is the beginning of your direct message history with{" "}
            <span className="text-grey-300">{currentDmUser.displayName}</span>
          </p>
          <div className="text-sm flex gap-4 items-center mt-4">
            <p>No servers in common</p>
            <span className="bg-grey-400/25 w-1 h-1 rounded-full"></span>
            {friendActionButtons}
          </div>
        </div>
        {/* Message List */}
        {messageList.map((message, index) => (
          <MessageChip key={index} message={message.content} />
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <DirectMessagesChatInput
          currentUser={currentDmUser}
          handleSendMessage={handleSendMessage}
        />
      </div>
    </>
  );
};

export default DirectMessageChat;
