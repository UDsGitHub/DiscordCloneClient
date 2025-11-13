import { Sidebar } from "components";
import CategoryList from "./CategoryList";
import ChannelList from "./ChannelList";
import { useServerContext } from "context";
import ServerTitleButton from "./ServerTitleButton";

const ServerSidebar = () => {
  const { selectedServer } = useServerContext();

  if (!selectedServer) {
    return <div>Loading</div>;
  }

  return (
    <Sidebar topBar={<ServerTitleButton server={selectedServer} />}>
      <div>
        <ChannelList channels={selectedServer.channels} />
        <CategoryList categories={selectedServer.categories} />
      </div>
    </Sidebar>
  );
};

export default ServerSidebar;
