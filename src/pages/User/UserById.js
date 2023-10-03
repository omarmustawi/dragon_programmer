import axios from "axios";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
// I IMPORT THE token HERE
import { role as currentUserRole, token } from "../../utility";
import Alert from "../../components/Alert/Alert";
import Course from "../../components/Course";

export default function UserById() {
  // GET id THAT WE HAVE CHOOSEN
  const location = useLocation();
  let id = location.pathname;
  id = id.match(/\d+/);

  // STORE USER'S INFO
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [jointCourses, setJointCourses] = useState("");
  const [createdCourses, setCreatedCourses] = useState("");

  // FOR ALERT MESSAGE
  const [message, setMessage] = useState("");

  // get data from database
  async function getUser() {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/user/${id}?token=${token}`)
      .then((res) => {
        setName(res.data.data.user.name);
        setEmail(res.data.data.user.email);
        setRole(res.data.data.user.role);
        setJointCourses(res.data.data.joinedCourses);
        setCreatedCourses(res.data.data.createdCourses);
      })
      .catch((err) => {
        console.error("Oops! There is an error: ", err);
      });
  }
  useEffect(() => {
    getUser();
  }, []);

  // Change Role To User
  async function changeToUser(id) {
    try {
      await axios
        .get(`http://127.0.0.1:8000/api/admin/delete/${id}?token=${token}`)
        .then((res) => setMessage("One User is Added"));
      setRole(0);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  // Change Role To Admin
  async function changeToAdmin(id) {
    try {
      await axios.post(
        `http://127.0.0.1:8000/api/admin/user/prompt/${id}?token=${token}`
      );
      // .then((res) => setMessage(res.data.message));
      setRole(1);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  return (
    <>
      <section className="bg-slate-400 p-3 w-4/5 m-auto shadow-2xl rounded-2xl">
        <BsPersonCircle size={60} className="text-violet-100 m-auto" />
        <div>
          <span className="text-violet-100 block p-2">Name: {name} </span>
          <span className="text-violet-100 block p-2">
            Email:{" "}
            <Link to={`mailto:${email}`} className="text-violet-700">
              {" "}
              {email}{" "}
            </Link>{" "}
          </span>
          <span className="text-violet-100 block p-2">
            Role: {role === 2 ? "Owner" : role === 1 ? "Admin" : "Student"}{" "}
          </span>

          <div>
            {role === 0 ? (
              <button onClick={() => changeToAdmin(id)} className="btnDash">
                {" "}
                change the role to admin{" "}
              </button>
            ) : role === 1 && currentUserRole === 2 ? (
              <button onClick={() => changeToUser(id)} className="btnDash">
                {" "}
                change the role to user{" "}
              </button>
            ) : (
              ""
            )}
          </div>
          <span className="text-violet-100 block p-2 text-center  ">
            <h1 className="font-semibold text-xl pb-4">
              {" "}
              The Joined Courses :{" "}
            </h1>{" "}
            <div className="flex gap-3 lg:gap-0 flex-wrap justify-center   items-start">
              {typeof jointCourses === "string"
                ? jointCourses
                : jointCourses.map((course, key) => (
                    <Course
                      key={key}
                      id={course.id}
                      imgIntro={course.image}
                      title={course.title}
                      level={course.level}
                      description={course.description}
                      price={course.price}
                      term={course.hours}
                      teacher={course.teacher}
                      setWidth="w-full lg:w-5/12  "
                      subscribe={course.subscribe}
                    />
                  ))}
            </div>
          </span>
          {role !== 0 && (
            <span className="text-violet-100 block p-2 text-center ">
              <h1 className="font-semibold text-xl pb-4">
                {" "}
                The Created Courses :{" "}
              </h1>{" "}
              <div className="flex gap-8 flex-wrap justify-center items-start">
                {typeof createdCourses === "string"
                  ? createdCourses
                  : createdCourses.map((course, key) => (
                      <Course
                        key={key}
                        id={course.id}
                        imgIntro={course.image}
                        title={course.title}
                        level={course.level}
                        description={course.description}
                        price={course.price}
                        term={course.hours}
                        setWidth={"w-10/12 sm:w-4/6 md:w-full xl:w-3/10 "}
                        subscribe={course.subscribe}
                      />
                    ))}
              </div>
            </span>
          )}
        </div>
      </section>
      {message && <Alert message={message} />}{" "}
    </>
  );
}
