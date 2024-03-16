import { useContext, useRef, useState } from "react";
import { ChatTopbar, UserAvatar, Message } from "components";
import { DirectMessagesContext } from "context";
import { DmUserType } from "model";

type Props = {};

const GeneralChat = (props: Props) => {
  const {
    dmUsers,
    setDmUsers,
    selectedSidebarTab,
    setCurrentMessage,
    sendMessage,
  } = useContext(DirectMessagesContext);
  const currentUser =
    dmUsers.find((user: DmUserType) => user.id === selectedSidebarTab) ??
    dmUsers[0];
  const inputRef = useRef<HTMLInputElement>(null);
  const [showOutline, setShowOutline] = useState(false);

  function handleFormFocus() {
    inputRef.current && inputRef.current.focus();
    setShowOutline(true);
  }

  function handleSendMessage(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(currentUser);
    setCurrentMessage(currentUser.id, "");
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
          <Message key={index} message={message} />
        ))}
      </div>
      <div className="p-4 absolute bottom-0 w-full">
        <form
          className={`bg-grey-350 p-4 rounded-xl ${
            showOutline &&
            "focus-within:outline focus-within:outline-4 focus-within:outline-blue-400"
          } caret-grey-300 flex`}
          tabIndex={0}
          onFocus={handleFormFocus}
          onChange={() => setShowOutline(false)}
          onSubmit={(e) => handleSendMessage(e)}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder={`Message @${currentUser.username}`}
            className="bg-transparent w-full outline-none text-grey-400"
            value={currentUser?.currentMessage}
            onChange={(e) => setCurrentMessage(currentUser.id, e.target.value)}
          />
          <button type="submit">
            <svg
              className="w-4 h-4 text-grey-400 hover:text-grey-300 duration-300 rotate-90"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default GeneralChat;
