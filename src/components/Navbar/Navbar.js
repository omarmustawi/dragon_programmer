import { Link, NavLink, useLocation } from "react-router-dom";
import { VscBook } from "react-icons/vsc";
import { BiBell } from "react-icons/bi";
import { useContext, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { WindowSize } from "../Context/WindowContext";
import Logout from "../Logout";
import { token, role } from "../../utility";
import { FaRegUserCircle } from "react-icons/fa";

export default function Navbar() {
  const windowSizeWidth = useContext(WindowSize);
  const [displayNav, setDisplayNav] = useState(false);
  const [scrollY, setScrollY] = useState();

  // FOR SET scrollY
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // FOR MAKE navbar DOESN'T APPEAR IN DASHBOARD
  const location = useLocation();
  if (!location.pathname.includes("controllPannel")) {
    return (
      <>
        {windowSizeWidth.windowSize > 1200 ? (
          <nav className={scrollY > 70 ? "bgNavbar navbar" : "navbar"}>
            <VscBook color="white" size={50} />
            <ul className="flex items-center justify-center gap-16  lg:mr-28 ">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/courses">Courses</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
              {token && role !== 0 && (
                <li>
                  <NavLink to="/controllPannel">Dashboard</NavLink>
                </li>
              )}
              {token ? (
                <>
                  <li>
                    <NavLink to="/noticeUser">
                      <BiBell size={30} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/user">
                      <FaRegUserCircle size={30} />
                    </NavLink>
                  </li>
                  <li>
                    <Logout />{" "}
                  </li>
                </>
              ) : (
                <li>
                  <Link className="btn" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        ) : (
          <nav
            className={
              scrollY > 70
                ? "navbarForSmallSize bgULSmall"
                : "navbarForSmallSize"
            }
          >
            <VscBook
              className="fixed top-1 left-5 z-10 "
              color="white"
              size={50}
            />
            <ul
              className={
                displayNav
                  ? "bgULSmall ulSmallSize translate-y-0 transition-all scroll-smooth duration-1000"
                  : "bgULSmall ulSmallSize -translate-y-full transition-all scroll-smooth duration-1000"
              }
            >
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/courses">Courses</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/blogs">Blogs</NavLink>
              </li>
              {token && role !== 0 && (
                <li>
                  <NavLink to="/controllPannel">Controll Pannel</NavLink>
                </li>
              )}
              {token ? (
                <>
                  <li>
                    <NavLink to="/noticeUser">
                      <BiBell size={30} />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/user">
                      <FaRegUserCircle size={30} />{" "}
                    </NavLink>
                  </li>
                  <li>
                    <Logout />
                  </li>
                </>
              ) : (
                <li>
                  <Link className="btn" to="/login">
                    Login
                  </Link>
                </li>
              )}
            </ul>
            {
              <GiHamburgerMenu
                onClick={() => setDisplayNav(!displayNav)}
                className="fixed top-5 right-5 z-10 "
                size={20}
                cursor={"pointer"}
              />
            }
          </nav>
        )}
      </>
    );
  } else {
    return null;
  }
}
