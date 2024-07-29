import { useState } from "react";
import { Link } from "react-router-dom";
import { Bars3BottomLeftIcon, XMarkIcon } from "@heroicons/react/16/solid";
import { FaceSmileIcon } from "@heroicons/react/24/outline";

const SideMenu = () => {
  const [open, setOpen] = useState(false);

  const openMenu = (): void => setOpen(true);
  const closeMenu = (): void => setOpen(false);

  const name = "";

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
          "md:w-1/2 w-full h-full absolute transition-all main-bg z-20 duration-700 " +
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
        <div className="flex items-center w-auto m-5 ms-8">
          <p className="overflow-hidden text-xl text-ellipsis">hello {name}</p>
          <div>
            <FaceSmileIcon className="size-10" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SideMenu;
