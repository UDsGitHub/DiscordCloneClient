import { FormEvent, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Input } from "components";
import { useLoginMutation } from "api";
import { useNavigate } from "react-router-dom";
import { ToastContext, UserContext } from "context";

type LoginProps = {
  toggleForm: () => void;
};

const Login = ({ toggleForm }: LoginProps) => {
  const [login, error] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);
  const { showToast } = useContext(ToastContext);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = {
      email,
      password,
    };

    const response = await login(values);
    if ("data" in response) {
      const user = response.data.user;
      setUser(user);
      navigate("/channels/@me", { replace: true });
    } else if ("error" in response) {
      const error = response.error;
      if ("data" in error) {
        showToast(error.data as string);
      } else {
        showToast("Error occured");
      }
    }
  };

  const validateEmail = (emailStr: string): string[] => {
    let errors = [];
    let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!re.test(emailStr)) {
      errors.push("Invalid email");
    }
    return errors;
  };

  const validatePassword = (passwordStr: string): string[] => {
    let errors = [];
    let re = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (passwordStr.length < 8) {
      errors.push("password must have at least 8 characters");
    }
    if (!re.test(passwordStr)) {
      errors.push(
        "Password must consist of at least one number, uppercase letter and symbol"
      );
    }

    return errors;
  };

  return (
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
      <div className="w-[540px] bg-grey-600 min-h-[380px] rounded-md p-8 shadow-lg">
        <form
          action=""
          className="text-white text-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold">Welcome back!</h2>
          <p className="text-grey-400">We're so excited to see you again!</p>
          <div className="flex flex-col text-grey-400 text-left">
            <Input
              type={"email"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label={"EMAIL"}
              id={"email"}
              required
              validator={validateEmail}
            />

            <Input
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label={"PASSWORD"}
              id={"password"}
              required
              validator={validatePassword}
              min={8}
              max={100}
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
  );
};

export default Login;
