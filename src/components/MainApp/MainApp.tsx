import { useParams, useNavigate } from "react-router-dom";
import { ServerNav } from "components";
import { DirectMessages } from "..";
import {
  UserContext,
  SocketContext,
  SocketProvider,
  DirectMessagesProvider,
} from "context";
import { useContext, useEffect, useState } from "react";
import AddServerModal from "components/Servers/AddServerModal";

type ServersProps = {};

const MainApp = (props: ServersProps) => {
  const { userId } = useParams();
  const { user } = useContext(UserContext);
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);

  const openAddServerModal = () => setIsAddServerModalOpen(true);
  const closeAddServerModal = () => setIsAddServerModalOpen(false);

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
          <ServerNav
            isAddServerModalOpen={isAddServerModalOpen}
            openAddServerModal={openAddServerModal}
          />
          <main className="grow flex bg-grey-600">
            <DirectMessages />
          </main>
          <AddServerModal
            isOpen={isAddServerModalOpen}
            onClose={closeAddServerModal}
          />
        </div>
      </DirectMessagesProvider>
    </SocketProvider>
  );
};

export default MainApp;
