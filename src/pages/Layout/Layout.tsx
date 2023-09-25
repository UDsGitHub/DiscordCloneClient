import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import TopNav from "./TopNav";

type Props = {};

const Layout = (props: Props) => {
  return (
    <>
      <SideNav />
      <TopNav />
      <Outlet/>
    </>
  );
};

export default Layout;
