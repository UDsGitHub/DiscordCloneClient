import { Sidebar } from "components";
import CategoryList from "./CategoryList";
import ChannelList from "./ChannelList";
import { useServerContext } from "context";

const ServerSidebar = () => {
  const { selectedServer: server } = useServerContext();

  if (!server) {
    return <div>Loading</div>
  }

  return (
    <Sidebar
      topBar={
        <button className="p-2.5 w-full shadow-md flex items-center justify-between">
          <p className="text-grey-300 font-bold text-sm h-7 px-1.5 flex items-center rounded-md">
            {server.name}
          </p>
          <span>
            <svg
              className="w-6 h-6 text-grey-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m8 10 4 4 4-4"
              />
            </svg>
          </span>
        </button>
      }
    >
      <div>
        <ChannelList channels={server.channels} />
        <CategoryList categories={server.categories} />
      </div>
    </Sidebar>
  );
};

export default ServerSidebar;
