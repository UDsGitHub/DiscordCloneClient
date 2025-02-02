import { ChannelType } from "model";
import ChannelListItem from "./ChannelListItem";

type Props = {
  channels: ChannelType[];
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
