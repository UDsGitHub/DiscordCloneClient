import React, { FormEvent } from "react";
import { motion } from "framer-motion";
import {RequiredText} from "./common";

type LoginProps = {
  show: boolean;
  toggleForm: () => void;
};

const Login = ({ show, toggleForm }: LoginProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      {show && (
        <motion.div
          key="login"
          initial={{ opacity: 0, y: "-100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{
            type: "spring",
            damping: 25,
            stiffness: 200,
            duration: 0.5,
          }}
        >
          <div className="w-[540px] bg-grey-600 h-[380px] rounded-md p-8 shadow-lg">
            <form
              action=""
              className="text-white text-center"
              onSubmit={handleSubmit}
            >
              <h2 className="text-2xl font-semibold">Welcome back!</h2>
              <p className="text-grey-400">
                We're so excited to see you again!
              </p>
              <div className="flex flex-col text-grey-400 text-left">
                <label htmlFor="email" className="mt-4 mb-2 font-bold text-xs">
                  <RequiredText>EMAIL</RequiredText>
                </label>
                <input
                  type="text"
                  id="email"
                  className="p-2 font-normal outline-none rounded-sm bg-grey-800"
                />

                <label
                  htmlFor="password"
                  className="mt-4 mb-2 font-bold text-xs"
                >
                  <RequiredText>PASSWORD</RequiredText>
                </label>
                <input
                  type="text"
                  id="password"
                  className="p-2 font-normal outline-none rounded-sm bg-grey-800"
                />

                <button
                  className="text-white p-4 bg-purple-500 rounded-md mt-6 font-semibold hover:bg-purple-600 duration-200"
                  type="submit"
                >
                  Log In
                </button>
                <p className="mt-2 text-sm">
                  Need an account?{" "}
                  <button className="text-sky-400" onClick={toggleForm}>
                    Register
                  </button>
                </p>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default Login;
