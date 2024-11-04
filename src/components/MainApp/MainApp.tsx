import { useParams, useNavigate } from "react-router-dom";
import { ServerNav } from "components";
import { DirectMessages } from "..";
import {
  UserContext,
  SocketContext,
  SocketProvider,
  DirectMessagesProvider,
} from "context";
import { useContext, useEffect } from "react";

type ServersProps = {};

const MainApp = (props: ServersProps) => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      // Clean up the effect
      return () => {
        socket.off("connect");
        socket.off("disconnect");
      };
    }
  }, [socket]);

  // Use a default value if userId is not provided
  const actualUserId = userId || "@me";

  // If the userId is "@me", you can use Navigate to change the URL to "/channels/@me"
  if (actualUserId === "@me") {
    // do something
  }

  return (
    <SocketProvider>
      <DirectMessagesProvider>
        <div className="h-full flex">
          <ServerNav />
          <main className="grow flex bg-grey-600">
            <DirectMessages />
          </main>
        </div>
      </DirectMessagesProvider>
    </SocketProvider>
  );
};

export default MainApp;
