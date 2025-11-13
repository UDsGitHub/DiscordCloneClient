import { ChannelItemContextMenu } from "components";
import ServerSettingsContextMenu from "components/Servers/ContextMenu/ServerSettingsContextMenu";
import { ChannelModel } from "model/Servers/ChannelModel";
import { ServerModel } from "model/Servers/ServerModel";
import { createContext, useContext, useState } from "react";

export enum ContextMenuType {
  server,
  serverSettings,
  channel,
  category,
}

interface ContextMenuContextType {
  isVisible: boolean;
  hideContextMenu: () => void;
  showContextMenu: (
    type: ContextMenuType,
    coord: number[],
    selectedChannel?: ChannelModel,
    selectedServer?: ServerModel
  ) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType>({
  isVisible: false,
  showContextMenu: () => {},
  hideContextMenu: () => {},
});

const ContextMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [coord, setCoord] = useState<number[]>([0, 0]);
  const [contextMenuChannel, setContextMenuChannel] = useState<
    ChannelModel | undefined
  >(undefined);
  const [contextMenuServer, setContextMenuServer] = useState<
    ServerModel | undefined
  >(undefined);
  const [contextMenuType, setContextMenuType] = useState<
    ContextMenuType | undefined
  >(undefined);

  function showContextMenu(
    type: ContextMenuType,
    coord: number[],
    eventChannel?: ChannelModel,
    eventServer?: ServerModel
  ) {
    const channelMenuTypes = [
      ContextMenuType.category,
      ContextMenuType.channel,
    ];
    if (channelMenuTypes.includes(type) && eventChannel) {
      setContextMenuChannel(eventChannel);
      setIsVisible(true);
    } else if (eventServer) {
      setContextMenuServer(eventServer);
      setIsVisible(true);
    }
    setContextMenuType(type);
    setCoord(coord);
  }

  function hideContextMenu() {
    setIsVisible(false);
    setContextMenuChannel(undefined);
    setContextMenuServer(undefined);
  }

  const getContentMenuComponent = () => {
    switch (contextMenuType) {
      case ContextMenuType.channel:
        return (
          <ChannelItemContextMenu
            coord={coord}
            eventChannel={contextMenuChannel!}
          />
        );
      case ContextMenuType.server:
        return <div></div>;
      case ContextMenuType.serverSettings:
        return (
          <ServerSettingsContextMenu
            coord={coord}
            eventServer={contextMenuServer!}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ContextMenuContext.Provider
      value={{ isVisible, showContextMenu, hideContextMenu }}
    >
      {isVisible && getContentMenuComponent()}
      {children}
    </ContextMenuContext.Provider>
  );
};

export const useContextMenuContext = () => useContext(ContextMenuContext);

export default ContextMenuProvider;
