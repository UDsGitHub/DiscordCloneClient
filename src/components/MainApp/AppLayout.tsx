import { Outlet, useNavigate } from "react-router-dom";
import {
  ChannelSettingsModal,
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
  ServerNav,
} from "components";
import {
  ContextMenuProvider,
  DirectMessagesProvider,
  ModalProvider,
  ServerProvider,
  SocketProvider,
  useSocketContext,
  useUserContext,
} from "context";
import { useEffect } from "react";

const AppLayout = () => {
  const { socket } = useSocketContext();
  const { user, fetchingUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchingUser && user === null) {
      navigate("/login", { replace: true });
    }
  }, [user, fetchingUser]);

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
    <SocketProvider>
      <ServerProvider>
        <DirectMessagesProvider>
          <ModalProvider>
            <ContextMenuProvider>
              <div className="h-full flex">
                <ServerNav />
                <main className="grow flex bg-grey-600">
                  <Outlet />
                </main>
                <CreateServerModal />
                <CreateChannelModal />
                <DeleteChannelModal />
                <ChannelSettingsModal />
              </div>
            </ContextMenuProvider>
          </ModalProvider>
        </DirectMessagesProvider>
      </ServerProvider>
    </SocketProvider>
  );
};

export default AppLayout;
