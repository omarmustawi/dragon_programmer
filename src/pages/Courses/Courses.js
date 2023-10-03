import { useEffect, useState } from "react";
import Course from "../../components/Course";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";
import SlidesCourses from "../../components/SlidesCourses";
import { token } from "../../utility";

// START COMPONENT
export default function Courses() {
  // TO STORE COURSES
  const [courses, setCourses] = useState([]);

  // TO STORE THE OBJECT THAT I WILL LOOK FOR IT
  const [searchObject, setSearchObject] = useState("");

  // TO STORE COURSES THAT I HAVE LOOKED FOR IT
  const [searchedCourses, setSearchedCourses] = useState([]);

  // get courses from back
  async function getCourses() {
    try {
      await axios
        .get(`http://127.0.0.1:8000/api/user/courses?token=${token}`)
        .then((res) => {
          setCourses(res.data.data);
          console.log("res:", res);
        });
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  useEffect(() => {
    getCourses();
  }, []);

  // HANDLE SEARCH FUNCTION TO SEARCH ABOUT TEACHER OR COURSE
  async function handleSearch() {
    let res = await axios
      .get(`http://127.0.0.1:8000/api/user/search-uc?search=${searchObject}`)
      .then((res) => setSearchedCourses(res.data.data.result));
  }

  return (
    <section>
      {/*  =================  start Into of page  ================= */}
      <div className="bgIntro">
        <div className="h-full relative">
          <h1 className="lg:text-5xl text-2xl text-white font-bold absolute bottom-1/3 lg:ml-20% ml-7">
            Our Courses
            <div className="mt-10">
              <BiSearchAlt
                onClick={handleSearch}
                size={30}
                className="absolute bottom-2 cursor-pointer"
              />
              <input
                className="search text-sm pl-20"
                type="search"
                onChange={(e) => setSearchObject(e.target.value)}
                name="searchObject"
                value={searchObject}
              />
            </div>
          </h1>
        </div>
      </div>
      {/*  =================  end Into of page  ================= */}

      {/*  =================  start result of search ================= */}
      {searchObject !== "" && (
        <div className=" m-5%">
          <div>
            <h1 className="text-center lg:text-4xl text-xl font-bold text-violet-600 mb-6">
              {" "}
              The result of search:
            </h1>
            {searchedCourses.length !== 0 ? (
              <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
                {searchedCourses.map((course) => (
                  <Course
                    id={course.id}
                    imgIntro={course.image}
                    title={course.title}
                    level={course.level}
                    description={course.description}
                    price={course.price}
                    term={course.hours}
                    teacher={course.teacher}
                    setWidth={"w-10/12 sm:w-4/6 md:w-full xl:w-3/10 "}
                    subscribe={course.subscribe}
                  />
                ))}
              </section>
            ) : (
              <h1 className="text-center text-red-400 font-bold">
                {" "}
                There is no any course yet{" "}
              </h1>
            )}
          </div>
        </div>
      )}
      {/*  =================  end result of search ================= */}

      {/*  =================  start  All Courses  ================= */}
      <div className=" m-5%">
        <div>
          {courses.length !== 0 ? (
            <h1 className="text-center lg:text-4xl text-xl font-bold text-violet-600 mb-6">
              Start Your Trip With Our
            </h1>
          ) : (
            <h1 className="capitalize text-xl text-center text-red-400 font-bold">
              {" "}
              There is no any course yet{" "}
            </h1>
          )}

          <section>
            <SlidesCourses courses={courses} />
          </section>
        </div>
      </div>
      {/*  =================  start  All Courses  ================= */}
    </section>
  );
}
