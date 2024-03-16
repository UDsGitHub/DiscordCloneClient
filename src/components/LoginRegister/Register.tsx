import { FormEvent, useContext, useState } from "react";
import { motion } from "framer-motion";
import { DateSelect, Input } from "components";
import { useRegisterMutation } from "api";
import { UserContext } from "context";
import { useNavigate } from "react-router-dom";

type RegisterProps = {
  toggleForm: () => void;
};

const Register = ({ toggleForm }: RegisterProps) => {
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [date, setDate] = useState("");
  const [register, result] = useRegisterMutation();
  const { setUser, setIsLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const values = {
      email,
      username,
      password,
      displayName,
      birthdate: new Date(date),
    };

    try {
      const response = await register(values);
      if ("data" in response) {
        console.log(response.data.user);
        const user = response.data.user;
        setUser(user);
        setIsLoggedIn(true);
        navigate("/channels/@me", { replace: true });
      }
    } catch (error) {
      console.error("Error occurred:", error);
    }
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

  const validateEmail = (emailStr: string): string[] => {
    let errors = [];
    let re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!re.test(emailStr)) {
      errors.push("Invalid email");
    }
    return errors;
  };

  return (
    <motion.div
      key="register"
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
      <div className="w-[480px] bg-grey-600 rounded-md p-8 shadow-lg">
        <form
          action=""
          className="text-white text-center"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold">Create an account</h2>
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
              type={"text"}
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              label={"DISPLAY NAME"}
              id={"display_name"}
              min={2}
              max={100}
            />
            <Input
              type={"text"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              label={"USERNAME"}
              id={"username"}
              required
              min={2}
              max={100}
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

            <label htmlFor="birthdate" className="mt-4 mb-2 font-bold text-xs">
              DATE OF BIRTH
            </label>
            <DateSelect onChange={setDate} />
            <button
              className="text-white p-4 bg-purple-500 rounded-md mt-6 font-semibold hover:bg-purple-600 duration-200"
              type="submit"
            >
              Continue
            </button>
            <p className="mt-2 text-xs">
              By registering, you agree to NotDiscord's{" "}
              <span className="text-sky-400">Terms of Service </span>
              and
              <span className="text-sky-400"> Privacy Policy</span>
            </p>

            <button
              className="text-sky-400 hover:underline text-sm text-left mt-4"
              onClick={toggleForm}
            >
              Already have an account?
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
