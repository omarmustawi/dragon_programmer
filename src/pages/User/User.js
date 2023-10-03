import { token , name } from "../../utility";
import { useEffect, useState } from "react";
import axios from "axios";
import SlidesCourses from "../../components/SlidesCourses";

// ================= start component ========================
export default function User() {
  // IF THE USER IS ADMIN AND UPLOADED COURSES WHICH ARE YOURS
  const [createdCourses, setCreatedCourses] = useState([]);

  const [joinedCourse, setJoinedCourse] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/api/user/edit?token=${token}`
      )
      .then((res) => {
        setCreatedCourses(res.data.data.createdCourses);
        setJoinedCourse(res.data.data.joinedCourses);
      });
  }, []);

  return (
    <div className="min-h-screen ">
      <div className="intro py-28">
        <h1 className="text-white lg:text-4xl text-xl text-center lg:py-5 font-bold">
          My Account
        </h1>
        <div className="lg:text-xl text-white font-bold text-center lg:py-5 py-2">
          {" "}
          {name}{" "}
        </div>
        <div className="flex flex-wrap justify-center items-center gap-7 text-slate-300 font-bold lg:text-3xl text-lg ">
          <div>
            {" "}
            Courses That I have Joined it:{" "}
            {typeof joinedCourse === "string"
              ? joinedCourse
              : joinedCourse.length}{" "}
          </div>
          <div>
            {" "}
            Courses That I have Created:{" "}
            {typeof createdCourses === "string"
              ? createdCourses
              : createdCourses.length}{" "}
          </div>
          {/* <div> Courses That I have Completed: 3 maybe i will Eliminates </div> */}
          {/* <div> Certificates: 3 maybe i will Eliminates </div> */}
        </div>
      </div>
      {/* COUSES THAT I Created  */}
      {typeof createdCourses === "object" && (
        <section className="py-36">
          <h1 className="text-center lg:text-4xl text-2xl font-semibold text-gray-600 py-4">
            Courses which I created:
          </h1>
          <section>
            <SlidesCourses courses={createdCourses} />
          </section>
        </section>
      )}
      {/* COUSES THAT I Joined  */}
      {typeof joinedCourse === "object" && (
        <section className="py-36">
          <h1 className="text-center lg:text-4xl text-2xl font-semibold text-gray-600 py-4">
            Courses which I joined:
          </h1>
          <section>
            <SlidesCourses courses={joinedCourse} />
          </section>
        </section>
      )}
    </div>
  );
}
// ================= end of component ========================
