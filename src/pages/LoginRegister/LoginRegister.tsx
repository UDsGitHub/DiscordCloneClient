import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Login, Register } from "../../components";
import { useLocation, Navigate, useNavigate } from "react-router-dom";

type LoginRegisterProps = {};

const LoginRegister = (props: LoginRegisterProps) => {
  let navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;
  console.log(currentURL);
  const [loginVisible, setLoginVisible] = useState(
    currentURL === "/login" ? true : false
  );

  function toggleForm() {
    if (currentURL === "/login") {
      navigate("/register", { replace: true });
    } else if (currentURL === "/register") {
      navigate("/login", {replace: true});
    }
    setLoginVisible((prev) => !prev);
  }

  return (
    <div className="bg-purple-500 h-full flex justify-center items-center">
      <AnimatePresence>
        <Login show={loginVisible} toggleForm={toggleForm} />
        <Register show={!loginVisible} toggleForm={toggleForm} />
      </AnimatePresence>
    </div>
  );
};

export default LoginRegister;
