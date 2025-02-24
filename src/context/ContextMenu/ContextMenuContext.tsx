import { ChannelItemContextMenu } from "components";
import { createContext, useContext, useState } from "react";

interface ContextMenuContextType {
  isVisible: boolean;
  hideContextMenu: () => void;
  showContextMenu: (coord: number[], channelId: string) => void;
}

export const ContextMenuContext = createContext<ContextMenuContextType>({
  isVisible: false,
  showContextMenu: () => {},
  hideContextMenu: () => {},
});

const ContextMenuProvider = ({ children }: { children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [coord, setCoord] = useState<number[]>([0, 0]);
  const [contextMenuChannel, setContextMenuChannel] = useState<string>("");

  function showContextMenu(coord: number[], channelId: string) {
    setCoord(coord);
    setContextMenuChannel(channelId);
    setIsVisible(true);
  }

  function hideContextMenu() {
    setIsVisible(false);
  }

  return (
    <ContextMenuContext.Provider
      value={{ isVisible, showContextMenu, hideContextMenu }}
    >
      {isVisible && (
        <ChannelItemContextMenu coord={coord} channelId={contextMenuChannel} />
      )}
      {children}
    </ContextMenuContext.Provider>
  );
};

export const useContextMenuContext = () => useContext(ContextMenuContext);

export default ContextMenuProvider;
