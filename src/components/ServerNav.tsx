import { useState } from "react";
import { ServerAvatar } from "./common";

const ServerNav = () => {
  const [active, setActive] = useState(0);
  const serverList: any[] = [];
  return (
    <nav className="bg-grey-800 w-[72px] shrink-0 h-full text-grey-300 pt-4 pr-2 overflow-y-scroll invisible-scroll">
      <ServerAvatar
        server={"me"}
        index={0}
        active={active}
        setActive={setActive}
      />
      <div className="w-full mb-2">
        <span className="bg-grey-500 block mx-auto w-8 h-[2px]"></span>
      </div>
      {serverList.map((server, index) => (
        <ServerAvatar
          key={index}
          server={server}
          index={index + 1}
          active={active}
          setActive={setActive}
        />
      ))}
    </nav>
  );
};

export default ServerNav;
