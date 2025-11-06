import {
  LoginRegisterPage,
  AppLayout,
  DirectMessagesPage,
  ServersPage,
  FriendsPage,
  DirectMessageChat,
} from "components";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

function App() {
  const router = createBrowserRouter([
    { index: true, element: <Navigate to="/channels/@me" replace /> },
    {
      path: "/channels",
      Component: AppLayout,
      children: [
        {
          path: "/channels/@me",
          Component: DirectMessagesPage,
          children: [
            {
              index: true,
              Component: FriendsPage,
            },
            {
              path: "/channels/@me/:id",
              Component: DirectMessageChat,
            },
          ],
        },
        { path: "/channels/:serverId/:channelId", Component: ServersPage },
      ],
    },
    { path: "/login", Component: LoginRegisterPage },
    { path: "/register", Component: LoginRegisterPage },
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
