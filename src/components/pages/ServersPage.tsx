import { useServerContext } from "context";
import ServerSidebar from "../Servers/ServerSidebar";
import ServerChannelChat from "../Servers/ServerChannelChat";

const ServersPage = () => {
  const { selectedServer, selectedChannel } = useServerContext();

  if (!selectedServer || !selectedChannel) {
    return null;
  }

  console.log("over here selected channel is: ", selectedChannel);

  return (
    <>
      <ServerSidebar server={selectedServer} />
      <div className="grow flex flex-col relative">
        <ServerChannelChat channel={selectedChannel} />
      </div>
    </>
  );
};

export default ServersPage;
