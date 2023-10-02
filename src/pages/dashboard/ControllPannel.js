import Sidebar from "./Sidebar";
import { FaTools } from "react-icons/fa";
import { Outlet } from "react-router-dom";
import { FaBarsProgress } from "react-icons/fa6";
import { useContext } from "react";
import { MenuContext } from "../../components/Context/MenuContext";
export default function ControllPannel() {
  // handleOpenSidebar
  const menu = useContext(MenuContext);
  function handleOpenSidebar() {
    menu.setIsOpen(!menu.isOpen);
    console.log("isOpen: ", menu.isOpen);
  }
  return (
    <section className="min-h-screen w-screen absolute bg-dash1">
      <div className="flex ">
        <Sidebar />
        <div className="flex flex-col gap-3 w-full">
          <h1 className="text-center w-full pt-3 text-2xl font-semibold  text-violet-600 ">
            Controll Pannel <FaTools size={30} className=" inline-block" />{" "}
          </h1>
          <FaBarsProgress
            onClick={handleOpenSidebar}
            className={
              menu.isOpen
              ? "text-dashbtn -scale-110 absolute top-4 right-7 z-20"
              : "text-violet-600 absolute top-4 right-7"
            }
            cursor={"pointer"}
            size={25}
          />
          <Outlet />
        </div>
      </div>
    </section>
  );
}
