import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import ThemeSwitch from "./ThemeSwitch";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

const SideMenu = () => {
  const { isLoggedIn } = useAppContext();
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");

  const openMenu = (): void => setOpen(true);
  const closeMenu = (): void => setOpen(false);

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  useEffect(() => {
    setUsername(currentUser?.username || "");
  }, [currentUser]);

  return (
    <>
      <button onClick={openMenu}>
        <Bars3BottomLeftIcon />
      </button>
      <button
        onClick={closeMenu}
        className={
          "absolute w-full h-full bg-slate-900/50 z-10 " +
          (open ? "open-sidenav-bg open-sidenav" : "close-sidenav-bg")
        }
      ></button>
      <div
        className={
          "flex flex-col md:w-1/2 w-full h-full absolute transition-all main-bg z-20 duration-700 " +
          (open ? "open-sidenav" : "close-sidenav")
        }
      >
        <div className="flex items-center p-6 secondary-bg">
          <div className="flex p-0.5">
            <button onClick={closeMenu}>
              <XMarkIcon />
            </button>
            <span className="logo">
              <Link to="/">todo</Link>
            </span>
          </div>
        </div>
        <div className="flex flex-col flex-1 w-auto m-5 ms-8">
          <div className="flex items-center">
            <p className="overflow-hidden text-xl max-w-96 text-ellipsis">
              hi {isLoggedIn ? username : ""}
            </p>
            <FaceSmileIcon className="size-10" />
          </div>
          <ThemeSwitch />
        </div>
      </div>
    </>
  );
};

export default SideMenu;
