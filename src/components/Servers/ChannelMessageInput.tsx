import { MessageInput } from "components/common";
import { useServerContext } from "context";
import { ChannelType } from "model";
import { useEffect, useState } from "react";

type Props = {
  channel: ChannelType;
  handleSendMessage: (message: string) => void;
};

const ChannelChatInput = ({ channel, handleSendMessage }: Props) => {
  const { updateCurrentMessage } = useServerContext();
  const [messageValue, setMessageValue] = useState<string>(
    channel.currentMessage ?? ""
  );

  useEffect(() => {
    setMessageValue(channel.currentMessage ?? "");
  }, [channel]);

  function handleChange(value: string) {
    setMessageValue(value);
  }

  function handleBlur(value: string) {
    updateCurrentMessage(channel.id, value);
  }

  function handleSubmit() {
    if (messageValue !== "") {
      handleSendMessage(messageValue);
      updateCurrentMessage(channel.id, "");
      setMessageValue("");
    }
  }

  return (
    <MessageInput
      value={messageValue}
      placeHolder={`Message #${channel.name}`}
      onChange={handleChange}
      onBlur={handleBlur}
      onSubmit={handleSubmit}
    />
  );
};

export default ChannelChatInput;
