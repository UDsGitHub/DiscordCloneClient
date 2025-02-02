import { useNavigate } from "react-router-dom";
import {
  CreateServerModal,
  DirectMessagesPage,
  ServerNav,
  ServersPage,
} from "components";
import { useServerContext, useSocketContext, useUserContext } from "context";
import { useEffect } from "react";
import CreateChannelModal from "components/Servers/CreateChannelModal";

const MainApp = () => {
  const { user } = useUserContext();
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const { selectedServer } = useServerContext();

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

  return (
    <div className="h-full flex">
      <ServerNav />
      <main className="grow flex bg-grey-600">
        {selectedServer === undefined ? (
          <DirectMessagesPage />
        ) : (
          <ServersPage />
        )}
      </main>
      <CreateServerModal />
      <CreateChannelModal />
    </div>
  );
};

export default MainApp;
