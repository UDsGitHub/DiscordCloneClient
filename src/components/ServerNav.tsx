import { useState } from "react";
import { ServerAvatar } from "./common";

const ServerNav = () => {
  const [active, setActive] = useState(0);
  const serverList = [..."udochukwu".toUpperCase()];
  return (
    <nav className="bg-grey-800 w-[72px] shrink-0 h-full text-grey-300 pt-4 overflow-y-scroll server-nav">
      <ServerAvatar server={"me"} index={0} active={active} setActive={setActive} />
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
