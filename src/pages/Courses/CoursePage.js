import Comment from "../../components/Comment";
import { AiOutlineSend } from "react-icons/ai";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

export default function CoursePage() {
  // TO GET id_course
  const location = new useLocation();
  let id_course = location.pathname;
  id_course = id_course.match(/\d+/);

  // TO STORE VIDEOS
  const [videos, setVideos] = useState([]);
  // TO STORE COURSE INFO
  const [courseInfo, setCourseInfo] = useState();

  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/user/course/info/${id_course}`)
        .then((res) => {
          console.log("res: ", res);
          setVideos(res.data.data.video);
          setCourseInfo(res.data.data.course);
        });
      console.log("courseInfo: ", courseInfo.image);
    } catch (err) {
      console.error("Oops! There is an error:", err);
    }
  }, []);

  // useRef for handle playlist
  const videoRef = useRef(null);
  const [titleRef, setTitleRef] = useState();
  const [descriptionRef, setDescriptionRef] = useState();

  // Function to play the selected video
  const playVideo = (video) => {
    console.log("videoUrl: ", video);
    videoRef.current.src = video.url;
    setTitleRef(video.title);
    setDescriptionRef(video.description);
    console.log("titleRef: ", titleRef, " descriptionRef: ", descriptionRef);
    videoRef.current.play();
  };

  return (
    <section>
      <div>
        <header className="intro lg:p-32 md:p-14 px-5 py-16">
          <div className=" flex flex-wrap md:flex-nowrap justify-between gap-12">
            {/* <img
              className="w-fit h-60 m-auto md:m-0"
              src={courseInfo.image}
              alt="imgCourse"
            /> */}
            <div>
              <h1 className="text-purple-900 font-semibold lg:text-3xl text-xl">
                LEARN PYTHON FROM ZERO TO HERO
              </h1>
              <span className="text-white mt-10">
                The automated process all your website tasks. Discover tools and
                techniques to engage effectively with vulnerable children and
                young people.
              </span>
            </div>
          </div>
          <h1 className="text-purple-900 font-semibold lg:text-3xl text-xl my-6">
            What you will Learn ?
          </h1>
          <ul className="text-white list-inside list-decimal">
            <li>
              Fusce dapibus lacinia volutpat. Fusce tincidunt turpis ac feugiat
              varius.
            </li>
            <li>
              Etiam tincidunt lorem tortor, hendrerit sagittis tellus fermentum
              sed.
            </li>
            <li>
              Duis interdum sapien ante, sit amet maximus augue ultricies at.
            </li>
            <li>Aenean eros massa, luctus id porta at, ultrices ut sapien.</li>
            <li>
              Integer at pulvinar sapien. Aenean turpis arcu, vehicula sit amet
              tortor sed, eleifend ultrices mauris.
            </li>
            <li>Quisque sollicitudin erat ex, id eleifend eros congue ut.</li>
          </ul>
        </header>
      </div>
      {/* START PLAYLIST  */}
      <div className="video-playlist">
        <video ref={videoRef} controls className="w-full" />
        <div className="flex justify-around">
          <p className="font-bold"> {titleRef} </p>
          <p className="font-bold"> {descriptionRef} </p>
        </div>
        <h2 className="text-center font-bold mt-10 text-xl">Video Playlist</h2>
        <div>
          {videos.map((video, index) => (
            <div
              key={index}
              className="video-item"
              onClick={() => playVideo(video)}
            >
              <div className="flex flex-col md:flex-row md:justify-around w-full">
                <p>{video.title}</p>
                <p>{video.description}</p>
              </div>
              <MdOutlineSlowMotionVideo className="text-4xl" />
            </div>
          ))}
        </div>
      </div>
      {/* END PLAYLIST  */}
      <h1 className="lg:text-4xl text-xl text-center font-bold text-purple-900">
        Blogs✨
      </h1>
      <div className="lg:m-24 m-5 lg:p-20 sm:p-10 p-3 rounded-2xl bg-slate-100">
        <div className="relative">
          {" "}
          <input
            className="w-full inline pr-10"
            type="text"
            placeholder="Put your questions here: ✨"
          />
          <AiOutlineSend
            className="absolute top-0 right-0"
            cursor={"pointer"}
            size={30}
            display={"inline"}
          />
        </div>
        <Comment
          name="omar mustawy"
          text="How to install react , next js and VScode on linux."
        />
        <Comment
          className="mr-7"
          name="omar mustawy"
          text="Using responsive utility variants to build adaptive user interfaces."
        />
        <Comment name="omar mustawy" text="How to grid in tailwind css" />
      </div>
    </section>
  );
}
