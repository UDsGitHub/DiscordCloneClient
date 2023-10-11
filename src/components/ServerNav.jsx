import { useState } from "react";
import Avatar from "./common/Avatar";

const ServerNav = () => {
  const [active, setActive] = useState(0);
  const serverList = [..."udochukwu".toUpperCase()];
  return (
    <nav className="bg-grey-800 w-[72px] h-full text-grey-300 pt-4 overflow-y-scroll server-nav">
      <Avatar server={"me"} index={0} active={active} setActive={setActive} />
      <div className="w-full mb-2">
        <span className="bg-grey-400 block mx-auto w-8 h-[2px]"></span>
      </div>
      {serverList.map((server, index) => (
        <Avatar key={index} server={server} index={index + 1} active={active} setActive={setActive} />
      ))}
    </nav>
  );
};

export default ServerNav;
