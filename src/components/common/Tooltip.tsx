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

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const rect = target.getBoundingClientRect();
    
    const top =
      direction === "top"
        ? rect.top - rect.height - 5
        : rect.top + rect.height / 2;
    const left =
      direction === "top"
        ? rect.left + rect.width / 2
        : rect.right + rect.width + 5;
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
              top: `${position.top}px`,
              left: `${position.left}px`,
            }}
            className={`tooltip fixed opacity-[${
              position.visible ? "100%" : "0"
            }] ${
              direction === "top" ? "-translate-x-1/2" : "-translate-y-1/2"
            }`}
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
