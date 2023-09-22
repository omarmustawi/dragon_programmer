import axios from "axios";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { token } from "../../utility";

export default function AddVideo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState();

  //   GET course_id WHICH I CHOOSE IT
  const location = useLocation();
  let course_id = location.pathname;
  course_id = course_id.match(/\d+/);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("course_id", course_id);
    form.append("video", video);
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/admin/course/add-video?token=${token}`,
        form
      );
      console.log("res: " , res );
      //   setMessage(res.data.message);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  return (
    <>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        {" "}
        Add video{" "}
      </h1>
      <form onSubmit={handleSubmit} className=" w-full mx-auto relative ">
        <input
          className="inputDas  "
          type="text"
          placeholder="Title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="bg-transparent mx-auto   focus:outline-none h-20 inputDas"
          type="text"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="flex justify-around w-96 m-auto">
          <label
            htmlFor="file-input"
            className="custom-file-upload  flex justify-around"
          >
            <span className="text-center">Choose Vedio</span>
            <input
              id="file-input"
              className="input-file"
              type="file"
              placeholder="Video"
              name="video"
              // value={photo}
              onChange={(e) => setVideo(e.target.files[0])}
            />{" "}
          </label>
          {/* <input
              id="file-input"
              className="input-file"
              type="file"
              placeholder="Video"
              name="video"
              // value={video}
              onChange={(e) => setVideo(e.target.files[0])}
            />{" "} */}
          <button type="submit" className=" btnDash">
            {" "}
            Add Video{" "}
          </button>
        </div>
      </form>
    </>
  );
}
