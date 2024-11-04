import { useSendFriendRequestMutation } from "api";
import { ToastContext } from "context";
import React, { useState, useRef, useContext } from "react";

type Props = {};

const FriendRequestInput = (props: Props) => {
  const { showToast } = useContext(ToastContext);
  const [inputUsername, setInputUsername] = useState("");
  const [showOutline, setShowOutline] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [sendFriendRequest] = useSendFriendRequestMutation();

  const handleFormFocus = () => {
    setShowOutline(true);
  };

  const handleChange = (val: string) => {
    setInputUsername(val);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUsername !== "") {
      sendFriendRequest(inputUsername)
        .unwrap()
        .catch((e) => {
          if ("status" in e && e.status >= 400) {
            showToast(e.data.message);
          }
        });
      setInputUsername("");
    }
  };

  return (
    <form
      action=""
      onFocus={handleFormFocus}
      onBlur={() => setShowOutline(false)}
      className={`bg-grey-800 text-grey-400 px-3 rounded-lg flex items-center h-[50px] ${
        showOutline &&
        "focus-within:outline focus-within:outline-2 focus-within:outline-blue-400"
      }`}
    >
      <input
        className="bg-transparent outline-none h-10 flex-auto py-1 mr-4"
        type="text"
        placeholder="You can add friends with their Discord username."
        value={inputUsername}
        onChange={(e) => handleChange(e.target.value)}
        ref={inputRef}
      />
      <div>
        <button
          className={`px-4 py-2 rounded-sm text-sm duration-300 ${
            inputUsername
              ? "bg-purple-500 text-white hover:bg-purple-500/75 active:bg-purple-500/50"
              : "bg-purple-500/50 text-inherit cursor-not-allowed"
          }`}
          type="submit"
          onClick={handleFormSubmit}
          disabled={!inputUsername}
        >
          Send Friend Request
        </button>
      </div>
    </form>
  );
};

export default FriendRequestInput;
