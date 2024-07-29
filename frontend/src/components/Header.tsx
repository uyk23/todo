import { NavLink, Link } from "react-router-dom";
import SideMenu from "./SideMenu";
import { useAppContext } from "../contexts/AppContext";
import LogOutBtn from "./LogOutBtn";

const Header = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <div className="flex items-center justify-between p-6 pe-6 secondary-bg">
      <div className="flex p-0.5 md:p-0">
        <SideMenu />
        <span className="logo">
          <Link to="/">todo</Link>
        </span>
      </div>
      <span className="ms-auto md:flex md:gap-10 md:m-0">
        <NavLink className="hidden md:block" to="/this-week">
          this week
        </NavLink>
        <NavLink className="md:block" to="/">
          today
        </NavLink>
        <NavLink className="hidden md:block" to="/tomorrow">
          tomorrow
        </NavLink>
      </span>
      {isLoggedIn ? (
        <LogOutBtn />
      ) : (
        <Link className="mx-2 primary-btn" to="/login">
          sign in
        </Link>
      )}
    </div>
  );
};

export default Header;
