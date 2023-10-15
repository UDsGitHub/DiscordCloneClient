import { useParams, Navigate } from "react-router-dom";
import { ServerNav, Sidebar } from "../../components";

type ServersProps = {}

const Servers = (props: ServersProps) => {
  const { userId } = useParams();

  // Use a default value if userId is not provided
  const actualUserId = userId || "@me";

  // If the userId is "@me", you can use Navigate to change the URL to "/channels/@me"
  if (actualUserId === "@me") {
    // do something
  }

  return (
    <div className="h-full flex">
      <ServerNav />
      <main className="grow bg-grey-500">
        <Sidebar />
        <div className="grow"></div>
      </main>
    </div>
  );
};

export default Servers;
