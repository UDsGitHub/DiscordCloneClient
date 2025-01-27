import { useLazyGetChannelInfoQuery } from "api";
import { ChannelMessageType, ChannelType } from "model";
import { createContext, ReactNode, useState } from "react";

interface ChannelContextType {
  selectedChannel?: ChannelType;
  handleChannelSelect: (serverId: string, channelId: string) => void;
}

export const ChannelContext = createContext<ChannelContextType>({
  selectedChannel: undefined,
  handleChannelSelect: () => {},
});

const ChannelProvider = ({ children }: { children: ReactNode }) => {
  const [getChannelInfo] = useLazyGetChannelInfoQuery();
  const [selectedChannel, setSelectedChannel] = useState<
    ChannelType | undefined
  >(undefined);

  function handleChannelSelect(serverId: string, channelId: string) {
    getChannelInfo({ serverId, channelId })
      .unwrap()
      .then((data) => setSelectedChannel(data))
      .catch((err) => console.log(err));
  }

  return (
    <ChannelContext.Provider value={{ selectedChannel, handleChannelSelect }}>
      {children}
    </ChannelContext.Provider>
  );
};

export default ChannelProvider;
