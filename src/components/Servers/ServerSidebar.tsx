import { Sidebar } from "components";
import { useServerContext } from "context";
import { ServerType } from "model";

type Props = {
  server: ServerType;
};

const ServerSidebar = ({ server }: Props) => {
  const { selectedChannel } = useServerContext();
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
        <ol>
          {server.channels.map((channel) => (
            <li>{channel.name}</li>
          ))}
        </ol>
        {server.categories.map((category) => (
          <div key={category.id} className="mt-4 text-grey-400/75 text-sm">
            <button className="flex items-center justify-between w-full group mb-1 pr-4">
              <div className="text-xs flex items-center">
                <svg
                  className="w-4 h-4 inline-block"
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
                <p className="inline-block group-hover:text-grey-300">
                  {category.name}
                </p>
              </div>
              <div className="hover:text-grey-300">
                <svg
                  aria-hidden="true"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M13 6a1 1 0 1 0-2 0v5H6a1 1 0 1 0 0 2h5v5a1 1 0 1 0 2 0v-5h5a1 1 0 1 0 0-2h-5V6Z"
                  ></path>
                </svg>
              </div>
            </button>
            <ol className="px-2">
              {category.channels.map((channel) => (
                <li
                  key={channel.id}
                  className={`rounded-md p-[6px] ${
                    selectedChannel?.id == channel.id
                      ? "bg-[#404249] text-grey-300"
                      : "hover:bg-grey-450"
                  }`}
                >
                  <button className="flex items-center gap-1">
                    {channel.type == 0 ? (
                      <svg
                        className="w-5 h-5"
                        x="0"
                        y="0"
                        aria-hidden="true"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          fillRule="evenodd"
                          d="M10.99 3.16A1 1 0 1 0 9 2.84L8.15 8H4a1 1 0 0 0 0 2h3.82l-.67 4H3a1 1 0 1 0 0 2h3.82l-.8 4.84a1 1 0 0 0 1.97.32L8.85 16h4.97l-.8 4.84a1 1 0 0 0 1.97.32l.86-5.16H20a1 1 0 1 0 0-2h-3.82l.67-4H21a1 1 0 1 0 0-2h-3.82l.8-4.84a1 1 0 1 0-1.97-.32L15.15 8h-4.97l.8-4.84ZM14.15 14l.67-4H9.85l-.67 4h4.97Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M12 3a1 1 0 0 0-1-1h-.06a1 1 0 0 0-.74.32L5.92 7H3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h2.92l4.28 4.68a1 1 0 0 0 .74.32H11a1 1 0 0 0 1-1V3ZM15.1 20.75c-.58.14-1.1-.33-1.1-.92v-.03c0-.5.37-.92.85-1.05a7 7 0 0 0 0-13.5A1.11 1.11 0 0 1 14 4.2v-.03c0-.6.52-1.06 1.1-.92a9 9 0 0 1 0 17.5Z"
                        ></path>
                        <path
                          fill="currentColor"
                          d="M15.16 16.51c-.57.28-1.16-.2-1.16-.83v-.14c0-.43.28-.8.63-1.02a3 3 0 0 0 0-5.04c-.35-.23-.63-.6-.63-1.02v-.14c0-.63.59-1.1 1.16-.83a5 5 0 0 1 0 9.02Z"
                        ></path>
                      </svg>
                    )}
                    <p>{channel.name}</p>
                  </button>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </Sidebar>
  );
};

export default ServerSidebar;
