import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Alert from "./components/Alert/Alert";
import { Link } from "react-router-dom";

// ========= Cookie =========
const cookie = new Cookies();
const token = cookie.get("token");
const currentUserId = cookie.get("id");
const name = cookie.get("name");
const email = cookie.get("email");
const role = cookie.get("role");

//======== Form for insert Course  ========
const Forma = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [level, setLevel] = useState("");
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");

  const id_course = props.id_edit_course[0] || false;

  // IF I WANT TO EDIT INFO OF A COURSE I HAVE TO GET THE INFO ABOUT THIS COURSE AND PUT THEM IN INPUTS
  // GET THE OLD INFO ABOUT THE COUSE
  useEffect(() => {
    if (props.id_edit_course) {
      try {
        axios
          .get(
            `http://127.0.0.1:8000/api/user/course/info/${id_course}?token=${token}`
          )
          .then((res) => {
            setTitle(res.data.data.course.title);
            setDescription(res.data.data.course.description);
            setLevel(res.data.data.course.level);
            setHours(res.data.data.course.hours);
            setPrice(res.data.data.course.price);
            setPhoto(res.data.data.course.photo);
          });
      } catch (err) {
        console.error("Oops! There is an error: ", err);
      }
    }
  }, []);

  // ////////////the end of GET THE OLD INFO ABOUT THE COUSE //////////////////

  // // Handle Message as Alert
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("photo", photo);
    form.append("level", level);
    form.append("hours", hours);
    if (props.id_edit_course) {
      form.append("course_id", 1);
    } else {
      form.append("teacher_id", props.teacher_id);
    }
    form.append("price", price);

    try {
      let res = await axios.post(props.api, form);
      setMessage(res.data.message);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        enctype="multipart/form-data"
        className=" w-full mx-auto relative "
      >
        <div className="lg:flex lg:gap-2 lg:justify-center lg:my-4">
          <input
            className="inputDas lg:w-2/5 lg:m-0"
            type="text"
            placeholder="Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="inputDas  lg:w-2/5 lg:m-0 "
            type="number"
            placeholder="Price"
            name="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="lg:flex lg:gap-2 lg:justify-center lg:my-4">
          <input
            className="inputDas lg:w-2/5 lg:m-0  "
            type="number"
            placeholder="Level"
            name="level"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          />
          <input
            className="inputDas lg:w-2/5 lg:m-0  "
            type="number"
            placeholder="Hours"
            name="hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          />
        </div>
        <textarea
          className="bg-transparent mx-auto lg:w-4/5 1/2 focus:outline-none h-20 inputDas"
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-around">
          <label
            htmlFor="file-input"
            className="custom-file-upload  flex justify-around"
          >
            <span className="text-center">Choose File</span>
            <input
              id="file-input"
              className="input-file"
              type="file"
              placeholder="Photo"
              name="photo"
              // value={photo}
              onChange={(e) => setPhoto(e.target.files[0])}
            />{" "}
          </label>
          <button type="submit" className=" btnDash">
            {" "}
            Add Course{" "}
          </button>
        </div>
      </form>
      {message !== "" && <Alert message={message} />}
    </>
  );
};

// ================= Notice Component ====================
function Notice(props) {
  return props.mesage.length ? (
    props.mesage.map((item) => (
      <div className="notice bg-blue-100 font-bold">
        <Link to={`/courses/${item.course_id}`} key={item.id}>
          <h1>
            {" "}
            One Video is added to course{" "}
            <span className="font-semibold text-xl italic">
              "{item.course_name}"
            </span>{" "}
            {"  "} by{" "}
            <span className="font-semibold text-xl italic">
              {" "}
              "{item.teacher_info.name}"{" "}
            </span>
            <br />
            Title: {item.title}
            <br />
            Description: {item.description}
          </h1>
        </Link>
      </div>
    ))
  ) : (
    <h1 className="text-lg mb-3 text-center text-red-600 font-bold">
      {" "}
      {`There is not any ${props.kind} notification ...!`}{" "}
    </h1>
  );
}
export { token, currentUserId, name, email, role , Forma, Notice };
