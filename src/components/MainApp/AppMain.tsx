import {
  ServerNav,
  CreateServerModal,
  CreateChannelModal,
  DeleteChannelModal,
  ChannelSettingsModal,
} from "components/Servers";
import InvitePeopleModal from "components/Servers/Modals/InvitePeopleModal";
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
      <InvitePeopleModal />
      <ChannelSettingsModal />
    </div>
  );
};

export default AppMain;
