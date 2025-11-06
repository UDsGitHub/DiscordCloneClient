import {
  ServerNav,
  CreateServerModal,
  CreateChannelModal,
  DeleteChannelModal,
  ChannelSettingsModal,
} from "components/Servers";
import { Outlet } from "react-router-dom";

const AppMain = () => {
  return (
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
  );
};

export default AppMain;
