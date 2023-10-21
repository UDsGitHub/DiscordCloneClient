import React from "react";

type RequiredTextProps = {
  children: React.ReactNode;
};

const RequiredText = ({ children }: RequiredTextProps) => {
  return (
    <>
      {children} <span className="text-red-600">*</span>
    </>
  );
};

export default RequiredText;
