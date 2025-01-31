import { MessageInput } from "components/common";
import { useDirectMessageContext } from "context";
import { DmUser } from "model";
import { useEffect, useState } from "react";

type Props = {
  currentUser: DmUser;
  handleSendMessage: (message: string) => void;
};

const DirectMessagesChatInput = ({ currentUser, handleSendMessage }: Props) => {
  const { setCurrentMessage } = useDirectMessageContext();
  const [messageValue, setMessageValue] = useState<string>(
    currentUser.currentMessage
  );

  useEffect(() => {
    setMessageValue(currentUser.currentMessage);
  }, [currentUser]);

  function handleChange(value: string) {
    setMessageValue(value);
  }

  function handleBlur(value: string) {
    setCurrentMessage(currentUser.userId, value);
  }

  function handleSubmit() {
    if (messageValue !== '') {
        handleSendMessage(messageValue);
        setCurrentMessage(currentUser.userId, "");
        setMessageValue("");
    }
  }

  return (
    <MessageInput
      value={messageValue}
      placeHolder={`Message @${currentUser.displayName}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};

export default DirectMessagesChatInput;
