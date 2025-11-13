import ChannelListItem from "./ChannelListItem";
import { ChannelModel } from "model/Servers/ChannelModel";

type Props = {
  channels: ChannelModel[];
};

const ChannelList = ({ channels }: Props) => {
  if (!channels.length) {
    return null;
  }

  return (
    <ol className="px-2">
      {channels.map((channel) => (
        <ChannelListItem key={channel.id} channel={channel} />
      ))}
    </ol>
  );
};

export default ChannelList;
