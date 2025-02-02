import React, { useState } from "react";
import ReactDOM from "react-dom";

type Props = {
  text: string;
  direction: "top" | "right";
  children: React.ReactNode;
};

const Tooltip = ({ text, direction, children }: Props) => {
  const [position, setPosition] = useState({
    top: 0,
    left: 0,
    visible: false,
  });
  const pseudoTopAfterStyles = `after:absolute after:content-[''] after:top-full after:left-1/2 after:-ml-[5px] after:border-[5px] after:border-r-transparent after:border-b-transparent after:border-l-transparent after:border-t-[#111214]`;
  const pseudoRightAfterStyles = `after:absolute after:content-[''] after:top-1/2 after:-translate-y-1/2 after:right-full after:-ml-[5px] after:border-[5px] after:border-t-transparent after:border-b-transparent after:border-l-transparent after:border-r-[#111214]`;
  const pseudoAfterStyles = direction === 'top' ? pseudoTopAfterStyles : pseudoRightAfterStyles;

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();

    const top =
      direction === "top"
        ? rect.top - 35
        : rect.top + rect.height / 2;
    const left =
      direction === "top"
        ? rect.left + rect.width / 2
        : rect.right + 5;
    setPosition({
      top, // Adjust top position to place it above
      left, // Center horizontally
      visible: true,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ ...position, visible: false });
  };

  return (
    <div
      className="group relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {position.visible &&
        ReactDOM.createPortal(
          <div
            style={{
              height: 30,
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            className={`tooltip opacity-[${
              position.visible ? "100%" : "0"
            }] ${
              direction === "top" ? "-translate-x-1/2" : "-translate-y-1/2"
            } ${pseudoAfterStyles}`}
          >
            {text}
          </div>,
          document.body
        )}
      {children}
    </div>
  );
};

export default Tooltip;