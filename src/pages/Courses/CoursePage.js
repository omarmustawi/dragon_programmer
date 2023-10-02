import Comment from "../../components/Comment";
import { AiOutlineSend } from "react-icons/ai";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { token } from "../../utility";
import { AllComments } from "../../components/Context/CommentsContext";

export default function CoursePage() {
  // TO GET id_course
  const location = new useLocation();
  let id_course = location.pathname;
  id_course = id_course.match(/\d+/);

  // TO STORE VIDEOS
  const [videos, setVideos] = useState([]);
  // TO STORE COURSE INFO
  const [courseInfo, setCourseInfo] = useState("");
  // TO STORE TEARCHER INFO
  const [teacherInfo, setTeacherInfo] = useState("");
  // TO GET COMMENTS FROM Commentscontext
  const all_comments = useContext(AllComments);

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // ============== HANDLE DELETE COMMENTS ======================
  // DELETE COMMENT
  // async function deleteComment(id) {
  //   try {
  //     await axios
  //       .delete(
  //         `http://127.0.0.1:8000/api/user/course/${id}/destroy-comment?token=${token}`
  //       )
  //       .then((res) => {
  //         console.log("delete res: ", res.data.data);
  //         setComments((prev) => prev.filter((item) => item.id !== id));
  //         setReGetComment(!reGetComment)
  //       });
  //   } catch (err) {
  //     console.error("Oops! There is an error:", err);
  //   }
  // }

  // ============= START HANDLE SUBMIT COMMENT ==============
  // TO STORE THE CURRENT COMMENT BEFORE SEND IT TO
  const [commentCurrent, setCommentCurrent] = useState("");

  // handle submit comment
  async function submitComment(e) {
    e.preventDefault();
    console.log("", all_comments.id_reply);
    try {
      if (all_comments.id_reply !== "") {
        // replay
        console.log("reply");

        const res = await axios.post(
          `http://127.0.0.1:8000/api/user/course/replay-comment/${all_comments.id_reply}?token=${token}`,
          { replay: commentCurrent }
        );
        console.log("ressReplay", res);
        console.log("newComment: ", res.data.data);
        setCommentCurrent("");
      } else {
        // comment
        console.log("comment");
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/course/${id_course}/insert-comment?token=${token}`,
            { comment: commentCurrent }
          )
          .then((res) => {
            const newComment = res.data.data;
            all_comments.setComments(newComment);
            // console.log("all comments: ", all_comments.comments );
            // setComments([...comments, newComment]);
            setCommentCurrent("");
          });
      }
    } catch (err) {
      console.error("Oops! There is an error:", err);
    }
  }
  // ============= END HANDLE SUBMIT COMMENT ==============

  // ==================== START GET DATA FROM DATABASE =========
  useEffect(() => {
    try {
      axios
        .get(
          `http://127.0.0.1:8000/api/user/course/info/${id_course}?token=${token}`
        )
        .then((res) => {
          console.log("res course: ", res);
          setVideos(res.data.data.video);
          setCourseInfo(res.data.data.course);
          setTeacherInfo(res.data.data.teacher);
          if (Array.isArray(res.data.data.comments)) {
            // Check if comments is an array
            all_comments.setComments(res.data.data.comments);
            console.log("all_comments111: ", all_comments.comments);
          }
        });
    } catch (err) {
      console.error("Oops! There is an error:", err);
    }
  }, []);
  // ==================== END GET DATA FROM DATABASE =========

  // ========= START HANDLE PLAYLIST ==========
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
  // ========= START HANDLE PLAYLIST ==========

  return (
    <section>
      {/* START HEADER OF COURSE */}
      <div>
        <header className="intro  px-5 py-16 xl:px-14">
          <div className=" flex flex-wrap lg:flex-nowrap  justify-between gap-12">
            <img
              className="w-full h-fit md:w-4/7 lg:w-1/2 m-auto md:m-0"
              src={courseInfo.image}
              alt="imgCourse"
            />
            <div className="flex flex-col">
              <h1 className="text-purple-900 font-semibold lg:text-3xl text-xl">
                {courseInfo.title}
              </h1>
              <span className="text-blue-800 font-bold">
                {courseInfo.description}
              </span>
              <span className="text-blue-800 font-bold">
                {" "}
                Price: {courseInfo.price} $
              </span>
              <span className="text-blue-800 font-bold">
                Level: {courseInfo.level}
              </span>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-purple-900 font-bold">
              {" "}
              This Course is created by{" "}
              <span className="text-sky-800"> {teacherInfo.name} </span>{" "}
            </p>
            <p className="text-purple-900 font-bold">
              {" "}
              You can contact with {teacherInfo.name} by email:{" "}
              <a className="text-sky-800" href={`mailto:${teacherInfo.email}`}>
                {" "}
                {teacherInfo.email}{" "}
              </a>{" "}
            </p>
          </div>
        </header>
      </div>
      {/* END HEADER OF COURSE */}

      {/* START PLAYLIST  */}
      {typeof videos === "object" ? (
        <div className="video-playlist">
          <video ref={videoRef} controls className="w-full" />
          <div className="flex justify-around">
            <p className="font-bold"> {titleRef} </p>
            <p className="font-bold">
              {"  "} {descriptionRef}{" "}
            </p>
          </div>
          <h2 className="text-center font-bold mt-10 text-xl">
            Video Playlist
          </h2>
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
      ) : (
        <h1 className="text-center text-red-400 font-bold my-5">
          {" "}
          THERE IS NOT ANY VIDEOS YET{" "}
        </h1>
      )}
      {/* END PLAYLIST  */}

      {/* START BLOG */}
      <h1 className="lg:text-4xl text-xl text-center font-bold text-purple-900">
        Blogs✨
      </h1>
      <div className="lg:m-24 m-5 lg:p-20 sm:p-10 p-3 rounded-2xl bg-slate-100">
        <div className="relative">
          {" "}
          <input
            required
            ref={inputRef}
            name="commentCurrent"
            value={commentCurrent}
            onChange={(e) => setCommentCurrent(e.target.value)}
            className="w-full inline pr-10"
            type="text"
            placeholder="Put your questions here: ✨"
          />
          <button type="submit" onClick={submitComment}>
            <AiOutlineSend
              className="absolute top-0 right-0 hover:text-green-700"
              cursor={"pointer"}
              size={30}
              display={"inline"}
            />
          </button>
        </div>
        {all_comments.comments?.map((item) => (
          <Comment
            key={item.comment_id}
            id_user={item.user.id}
            comment_id={item.comment_id}
            name={item.user.name}
            role={item.user.role}
            text={item.content}
            replies={item.replies}
            focusInput={focusInput}
            kind={"comment"}
            it_is_for={"course"}
            // setIsItReplay={setIsItReplay}
            // deleteComment={deleteComment}
          />
        ))}
      </div>
      {/* END BLOG */}
    </section>
  );
}
