import { useState } from "react";
import { Link } from "react-router-dom";
import { Drawer } from "@material-tailwind/react";
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
      <Drawer
        placement="left"
        open={open}
        onClose={closeMenu}
        className="main-bg"
      >
        <div className="flex items-center p-6 secondary-bg">
          <div className="flex">
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
      </Drawer>
    </>
  );
};

export default SideMenu;
