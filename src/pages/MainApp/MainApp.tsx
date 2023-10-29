import { useParams, Navigate } from "react-router-dom";
import { ServerNav} from "../../components";
import { DirectMessages } from "..";

type ServersProps = {};

const MainApp = (props: ServersProps) => {
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
      <main className="grow flex bg-grey-600">
        <DirectMessages />
      </main>
    </div>
  );
};

export default MainApp;
