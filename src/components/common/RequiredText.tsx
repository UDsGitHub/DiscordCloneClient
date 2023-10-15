import React, { ReactNode } from "react";

type RequiredTextProps = {
  children: ReactNode;
};

const RequiredText = ({ children }: RequiredTextProps) => {
  return (
    <>
      {children} <span className="text-red-600">*</span>
    </>
  );
};

export default RequiredText;
