import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import Alert from "./components/Alert/Alert";

// ========= Cookie =========
const cookie = new Cookies();
const token = cookie.get("token");
const currentUserId = cookie.get("id");
const name = cookie.get("name");
const email = cookie.get("email");

//======== Form for insert Course  ========
const Forma = (props) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const [level, setLevel] = useState("");
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");

  
  const id_course =  props.id_edit_course[0] || false;
  console.log("id:", id_course);

  // IF I WANT TO EDIT INFO OF A COURSE I HAVE TO GET THE INFO ABOUT THIS COURSE AND PUT THEM IN INPUTS
  // GET THE OLD INFO ABOUT THE COUSE
  useEffect(() => {
    if (props.id_edit_course) {
      try {
        axios
          .get(`http://127.0.0.1:8000/api/user/course/info/1`)
          .then((res) => {
            // console.log("response: ", res);
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

  // Handle Message as Alert
  const [message, setMessage] = useState("");

  // HOW TO MAKE Alert display for 10 sec
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    // Set alert to true to display it
    setAlert(true);

    // After 10 seconds, hide the alert
    const timeoutId = setTimeout(() => {
      setAlert(false);
    }, 5000); // 10000 milliseconds = 10 seconds

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [message]);
  // The  Handle Message as Alert

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
      console.log("111: ", res);
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
      {message !== "" && alert && <Alert message={message} />}
    </>
  );
};

export { token, currentUserId, name, email, Forma };
