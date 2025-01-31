import { useNavigate } from "react-router-dom";
import {
  AddServerModal,
  DirectMessagesPage,
  ServerNav,
  ServersPage,
} from "components";
import { useServerContext, useSocketContext, useUserContext } from "context";
import { useEffect, useState } from "react";

const MainApp = () => {
  const { user } = useUserContext();
  const { socket } = useSocketContext();
  const navigate = useNavigate();
  const [isAddServerModalOpen, setIsAddServerModalOpen] = useState(false);
  const { selectedServer } = useServerContext();

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

  return (
    <div className="h-full flex">
      <ServerNav
        isAddServerModalOpen={isAddServerModalOpen}
        openAddServerModal={openAddServerModal}
      />
      <main className="grow flex bg-grey-600">
        {selectedServer === undefined ? (
          <DirectMessagesPage />
        ) : (
          <ServersPage />
        )}
      </main>
      <AddServerModal
        isOpen={isAddServerModalOpen}
        onClose={closeAddServerModal}
      />
    </div>
  );
};

export default MainApp;
