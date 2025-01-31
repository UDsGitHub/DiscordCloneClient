import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Login, Register } from "components";
import { useLocation, useNavigate } from "react-router-dom";
import { useRouteTracker, useUserContext } from "context";

const LoginRegisterPage = () => {
  const { previousRoute, currentRoute } = useRouteTracker();
  const navigate = useNavigate();
  const location = useLocation();
  const currentURL = location.pathname;
  const [loginVisible, setLoginVisible] = useState(
    currentURL === "/login" ? true : false
  );
  const { user } = useUserContext();;

  useEffect(() => {
    if (
      user &&
      !previousRoute &&
      currentRoute &&
      currentRoute !== "/login" &&
      currentRoute !== "/register"
    ) {
      return navigate(currentRoute, { replace: true });
    } else if (
      user &&
      previousRoute &&
      previousRoute !== "/login" &&
      previousRoute !== "/register"
    ) {
      return navigate(previousRoute, { replace: true });
    }
    if (user) {
      return navigate("/channels/@me", { replace: true });
    }
  }, [user]);

  function toggleForm() {
    if (currentURL === "/login") {
      navigate("/register", { replace: true });
    } else if (currentURL === "/register") {
      navigate("/login", { replace: true });
    }
    setLoginVisible((prev) => !prev);
  }

  return (
    <div className="bg-purple-500 h-full flex justify-center items-center">
      <AnimatePresence>
        {loginVisible ? (
          <Login toggleForm={toggleForm} />
        ) : (
          <Register toggleForm={toggleForm} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default LoginRegisterPage;
