import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { token, currentUserId } from "../utility";
import { useState } from "react";
import Alert from "./Alert/Alert";

export default function Course(props) {
  const [subscribe, setSubscribe] = useState(props.subscribe);
  // // Handle Message as Alert
  const [message, setMessage] = useState("");

  // NAV AFTER LOGIN
  const navigate = useNavigate();

  // handleSubscripe() function
  async function handleSubscripe(course_id) {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/subscribe`,
        {
          course_id: course_id,
        },
        {
          headers: { Authorization: `Bearer ${token}` }, // Corrected "Authentication" to "Authorization"
        }
      );
      setMessage(res.data.data);
      setSubscribe(1);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  return (
    <div
      className={`p-5 mx-auto relative border-2 border-solid border-slate-200  rounded-xl  bg-gray-50 text-slate-900  ${props.setWidth}`}
    >
      <img
        className="w-full pb-2 h-60"
        src={props.imgIntro}
        alt={props.imgIntro}
      />
      <h1 className="text-lg py-2 text-indigo-800 font-bold">{props.title}</h1>
      <p className="py-2"> {props.description} </p>
      <div className="flex justify-between gap-3 flex-wrap">
        <div>
          <span> Level: </span>
          <span className="text-blue-600"> {props.level} </span>
        </div>
        <span className="text-red-500!"> Teacher:{props.teacher} </span>
      </div>
      <div className="flex justify-between gap-3 flex-wrap">
        <span> Price: {props.price} $ 💵</span>
        <span>Hours: {props.term} </span>
      </div>
      <div className="flex justify-around">
        {subscribe === 0 ? ( // user did not login
          navigate("/login")
        ) : (subscribe === 1 && currentUserId === props.teacher_id) ||
          subscribe === 2 ? ( // (user did login and he created this course) or user is subscriber in this course
          <Link
            to={`/courses/${props.id}`}
            className="btn text-white my-5 w-fit"
          >
            Move to course
          </Link>
        ) : ( 
          <button
            onClick={() => handleSubscripe(props.id)}
            className="btn text-white my-5 w-fit"
          >
            subscription
          </button>
        )}
      </div>
      {message && <Alert message={message} />}
    </div>
  );
}
