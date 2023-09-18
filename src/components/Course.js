import axios from "axios";
import { Link } from "react-router-dom";
import { token } from "../utility";

export default function Course(props) {
  // handleSubscripe() function
  async function handleSubscripe(course_id) {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/user/subscribe?course_id=${course_id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // Corrected "Authentication" to "Authorization"
        }
      );
      console.log("response: ", res.data.data);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  return (
    <div
      className={`p-5 m-auto  lg:w-full ${props.setWidth}  rounded-xl shadow-gray-300 shadow-lg relative bg-gray-50`}
    >
      <img
        className="w-full pb-2 h-60"
        src={`http://127.0.0.1:8000/images/${props.imgIntro}`}
        alt={props.imgIntro}
      />
      <h1 className="text-lg py-2 text-indigo-800 font-bold">{props.title}</h1>
      <p className="py-2"> {props.description} </p>
      <div className="flex justify-between gap-3 flex-wrap">
        <div>
          <span> Level: </span>
          <span className="text-blue-600"> {props.level} </span>
        </div>
        <span className="text-red-500"> Teacher:{props.teacher}  </span>
      </div>
      <div className="flex justify-between gap-3 flex-wrap">
        <span> Price: {props.price} $ 💵</span>
        <span>Hours: {props.term} </span>
      </div>
      <div className="flex justify-around">
        <button
          onClick={() => handleSubscripe(props.id)}
          className="btn text-white my-5 w-fit"
        >
          subscription
        </button>
        <Link to={`/courses/${props.id}`} className="btn text-white my-5 w-fit">Move to course</Link>
      </div>
    </div>
  );
}
