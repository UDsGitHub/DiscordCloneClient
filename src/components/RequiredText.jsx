import React from "react";

const RequiredText = ({children}) => {
  return (
    <>
      {children} <span className="text-red-600">*</span>
    </>
  );
};

export default RequiredText;
