import { useContext } from "react";
import { WindowSize } from "../../components/Context/WindowContext";
import { MenuContext } from "../../components/Context/MenuContext";
import { links } from "./NavLinks";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const windowSizeWidth = useContext(WindowSize);
  const windowSize = windowSizeWidth.windowSize;

  const menu = useContext(MenuContext);
  const isOpen = menu.isOpen;

  return (
    <>
      <div
        className="fixed z-10 top-0 left-0 bottom-0  right-0"
        style={{
          background: "rgba(3, 142, 220, 0.2)",
          display: isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="bg-slate-400 h-screen top-0 p-3 pt-3 fixed shadow-2xl shadow-slate-500 transition-transform duration-1000 z-10"
        style={{
          transform:
            windowSize < "768"
              ? isOpen
                ? "translateX(0px)"
                : "translateX(-100%)"
              : "",
          position: windowSize < "768" ? "fixed" : "sticky",
        }}
        // style={{
        //   left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
        //   width:
        //     windowSize < "768"
        //       ? "fit-content"
        //       : isOpen
        //       ? "220px"
        //       : "fit-content",
        //       position: "fixed"
        //   // position: windowSize < "768" ? "fixed" : "sticky",
        // }}
      >
        {links.map((item, key) => (
          <NavLink className={" text-violet-600"} key={key} to={item.path}>
            <span className="w-fit font-bold flex gap-2 my-3 items-center">
              {isOpen && windowSize > "768" && item.name}
              {item.icon}
            </span>
          </NavLink>
        ))}
      </div>
    </>
  );
}
