import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Login, Register } from "../../components";

const LoginSignup = () => {
  const [loginVisible, setLoginVisible] = useState(true);

  function toggleForm() {
    setLoginVisible((prev) => !prev);
  }

  return (
    <div className="bg-purple-500 h-full flex justify-center items-center">
      <AnimatePresence mode="wait">
        <Login show={loginVisible} toggleForm={toggleForm} />
        <Register show={!loginVisible} toggleForm={toggleForm} />
      </AnimatePresence>
    </div>
  );
};

export default LoginSignup;
