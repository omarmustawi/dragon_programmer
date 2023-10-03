import { Route, Routes } from "react-router-dom";
import "./index.css";
import { BsArrowUpSquareFill } from "react-icons/bs";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Courses from "./pages/Courses/Courses";
import User from "./pages/User/User";
import Navbar from "./components/Navbar/Navbar";
import CoursePage from "./pages/Courses/CoursePage";
import Blogs from "./pages/Blogs/Blogs";
import Footer from "./components/Footer";
import Err404 from "./pages/Errors/Err404";
import { useEffect, useState } from "react";
import About from "./pages/About/About";
import NoticeUser from "./pages/Notices/NoticeUser";
import ControllPannel from "./pages/dashboard/ControllPannel";
import Users from "./pages/User/Users";
import Notefictions from "./pages/Notices/Notefictions";
import AllAdmins from "./pages/dashboard/AllAdmins";
import AddCourse from "./pages/Courses/AddCourse";
import UserById from "./pages/User/UserById";
import SearchAboutUser from "./pages/User/SearchAboutUser";
import AllCoursesControllPannel from "./pages/Courses/AllCoursesControllPannel";
import NewRegistration from "./pages/dashboard/NewRegistration";
import EditCourse from "./pages/Courses/EditCourse";
import AddVideo from "./pages/dashboard/AddVideo";
import AddPost from "./pages/Blogs/AddPost";
import Events from "./pages/dashboard/Events";
import RequiredAuth from "./pages/Auth/RequiredAuth";

export default function App() {
  const [scrollY, setScrollY] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function goToUp() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <Navbar />
      <Routes>
        {/* Protected Routes */}
        <Route element={<RequiredAuth allowedRole={[2, 1]} />}>
          <Route path="/controllPannel" element={<ControllPannel />}>
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserById />} />
            <Route path="searchAboutUser" element={<SearchAboutUser />} />
            <Route path="searchAboutUser/:id" element={<UserById />} />
            <Route path="notefictions" element={<Notefictions />} />
            <Route path="allAdmins" element={<AllAdmins />} />
            <Route path="newRegistration" element={<NewRegistration />} />
            <Route path="addCourse" element={<AddCourse />} />
            <Route path="addPost" element={<AddPost />} />
            <Route path="events" element={<Events />} />
            <Route
              path="allCoursesControllPannel"
              element={<AllCoursesControllPannel />}
            />
            <Route
              path="allCoursesControllPannel/:id"
              element={<EditCourse />}
            />
            <Route
              path="allCoursesControllPannel/addVideo/:id"
              element={<AddVideo />}
            />
          </Route>
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/user" element={<User />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CoursePage />} />{" "}
        {/* HERR WHEN I AM IN COURSES LIST PAGE  AND THEN I MOVE TO A COURSE PAGE */}
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/err404" element={<Err404 />} />
        <Route path="/noticeUser" element={<NoticeUser />} />
      </Routes>
      <Footer />

      {scrollY && (
        <BsArrowUpSquareFill
          onClick={goToUp}
          size={30}
          cursor={"pointer"}
          className="fixed bottom-16 right-7 text-pink-500 transparent z-40"
        />
      )}
    </>
  );
}
