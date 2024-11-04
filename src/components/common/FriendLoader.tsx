import React from "react";

type Props = {};

const FriendLoader = (props: Props) => {
  return (
    <div className="flex gap-2">
      <div className="w-8 h-8 rounded-full bg-grey-400/25 animate-pulse"></div>
      <div className="flex-1 h-8 bg-grey-400/25 animate-pulse"></div>
    </div>
  );
};

export default FriendLoader;
