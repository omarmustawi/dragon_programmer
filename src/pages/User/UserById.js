import axios from "axios";
import { useEffect, useState } from "react";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
// I IMPORT THE token HERE
import { token } from "../../utility";
import Alert from "../../components/Alert/Alert";




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

  // FOR ALERT MESSAGE
  const [message, setMessage] = useState('');

  // get data from database
  async function getUser() {
    await axios
      .get(`http://127.0.0.1:8000/api/admin/user/${id}?token=${token}`)
      .then((res) => {
        setName(res.data.data.user.name);
        setEmail(res.data.data.user.email);
        setRole(res.data.data.user.role);
        setJointCourses(res.data.data.joinedCourses);
        console.log("res:", res);
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
      await axios
        .post(
          `http://127.0.0.1:8000/api/admin/user/prompt/${id}?token=${token}`
        )
        .then((res) => setMessage(res.data.message));
      setRole(1);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  // HOW TO MAKE Alert display for 10 sec
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // Set alert to true to display it
    setAlert(true);

    // After 10 seconds, hide the alert
    const timeoutId = setTimeout(() => {
      setAlert(false);
    }, 2000); // 10000 milliseconds = 10 seconds

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [message]);

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
          <span className="text-violet-100 block p-2">
            The Joined Courses : {jointCourses}
          </span>
          <div>
            {role === 0 ? (
              <button onClick={() => changeToAdmin(id)} className="btnDash">
                {" "}
                change the role to admin{" "}
              </button>
            ) : role === 1 ? (
              <button onClick={() => changeToUser(id)} className="btnDash">
                {" "}
                change the role to user{" "}
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </section>
      {alert && message !== ""  && <Alert message={message} />}{" "}
    </>
  );
}
