import React from "react";
import { useParams, Navigate } from "react-router-dom";
import { ServerNav } from "../../components";

const Servers = () => {
  const { userId } = useParams();

  // Use a default value if userId is not provided
  const actualUserId = userId || "@me";

  // If the userId is "@me", you can use Navigate to change the URL to "/channels/@me"
  if (actualUserId === "@me") {
    // do something
  }

  return (
    <div className="h-full flex">
      <ServerNav />
      <main className="grow bg-red-400"></main>
    </div>
  );
};

export default Servers;
