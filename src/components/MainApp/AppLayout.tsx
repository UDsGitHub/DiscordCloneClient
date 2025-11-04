import { Outlet, useNavigate } from "react-router-dom";
import {
  ChannelSettingsModal,
  CreateChannelModal,
  CreateServerModal,
  DeleteChannelModal,
  ServerNav,
} from "components";
import { RouteTrackerProvider, useSocketContext, useUserContext } from "context";
import { useEffect } from "react";

const AppLayout = () => {
  const { socket } = useSocketContext();
  const { user, fetchingUser } = useUserContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!fetchingUser && !user) {
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
    <RouteTrackerProvider>
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
    </RouteTrackerProvider>
  );
};

export default AppLayout;
