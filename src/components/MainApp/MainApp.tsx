import { useParams, useNavigate } from "react-router-dom";
import { ServerNav } from "components";
import { DirectMessages } from "..";
import { DirectMessagesProvider } from "context";
import { useContext, useEffect } from "react";
import { UserContext } from "context";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { DecodedJWT, User } from "model";

type ServersProps = {};

const MainApp = (props: ServersProps) => {
  const { userId } = useParams();
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const userToken = Cookies.get("token");

    if (userToken) {
      try {
        const decodedToken = jwtDecode<DecodedJWT>(userToken);
        const tokenUser: User = {
          id: decodedToken.id,
          email: decodedToken.email,
          displayName: decodedToken.displayName,
          username: decodedToken.username,
          password: decodedToken.password,
          birthdate: decodedToken.birthdate,
        };  
        setUser(tokenUser);
      } catch (error) {
        console.error("Failed to decode token:", error);
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  // Use a default value if userId is not provided
  const actualUserId = userId || "@me";

  // If the userId is "@me", you can use Navigate to change the URL to "/channels/@me"
  if (actualUserId === "@me") {
    // do something
  }

  return (
    <DirectMessagesProvider>
      <div className="h-full flex">
        <ServerNav />
        <main className="grow flex bg-grey-600">
          <DirectMessages />
        </main>
      </div>
    </DirectMessagesProvider>
  );
};

export default MainApp;
