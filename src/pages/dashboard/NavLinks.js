import { FaUsers } from "react-icons/fa";
import { BiBell } from "react-icons/bi";
import { RiVideoAddFill } from "react-icons/ri";
import { RxOpenInNewWindow } from "react-icons/rx";
import { MdAdminPanelSettings, MdOutlinePlayLesson, MdOutlinePostAdd, MdPersonSearch } from "react-icons/md";

export const links = [
  {
    name: "All Users",
    path: "users",
    icon: <FaUsers size={30} />,
  },
  {
    name: "Notefictions",
    path: "notefictions",
    icon: <BiBell size={30} />,
  },
  {
    name: "All Admins",
    path: "allAdmins",
    icon: <MdAdminPanelSettings size={30} />,
  },
  {
    name: "Search About  User",
    path: "searchAboutUser",
    icon: <MdPersonSearch size={30} />,
  },
  {
    name: "Add A Course",
    path: "addCourse",
    icon: <RiVideoAddFill size={30} />,
  },
  {
    name: "All Courses",
    path: "allCoursesControllPannel",
    icon: <MdOutlinePlayLesson size={30} />,
  },
  {
    name: "New Registration",
    path: "newRegistration",
    icon: <RxOpenInNewWindow size={30} />,
  },
  {
    name: "Add A Post",
    path: "addPost",
    icon: <MdOutlinePostAdd size={30} />,
  },
];
