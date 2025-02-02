import { useLazyGetChannelInfoQuery } from "api";
import { ChannelType } from "model";
import { createContext, ReactNode, useState } from "react";

interface ChannelContextType {
  selectedChannel?: ChannelType;
  handleChannelSelect: (channelId: string) => void;
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

  function handleChannelSelect(channelId: string) {
    getChannelInfo(channelId)
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
