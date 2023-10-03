import axios from "axios";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { FaUserPen } from "react-icons/fa6";
import { AllComments } from "./Context/CommentsContext";
import { useContext } from "react";
import { token, currentUserId } from "../utility";

export default function Comment(props) {
  const contextComment = useContext(AllComments);

  // ======= start deleteComment ===========
  async function deleteComment(id) {
    try {
      if (props.kind === "comment" && props.it_is_for === "post") {
        // Deleting a normal comment on a post
        console.log("Deleting a normal comment on a post" , id );
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/delete-comment?token=${token}`,
            { comment_id: id } // Correct this if it should be "comment_id"
          )
          .then((res) => {
            console.log("delete comment res: ", res);
            contextComment.setComments((prev) =>
              prev.filter((item) => item.comment_id !== id)
            );
          });
      } else if (props.kind === "comment" && props.it_is_for === "course") {
        // Deleting a normal comment on a course
        console.log("Deleting a normal comment on a course");
        await axios
          .delete(
            `http://127.0.0.1:8000/api/user/course/${id}/destroy-comment?token=${token}`
          )
          .then((res) => {
            console.log("delete comment res: ", res);
            contextComment.setComments((prev) =>
              prev.filter((item) => item.comment_id !== id)
            );
          });
      } else if (props.kind === "reply" && props.it_is_for === "post") {
        // Deleting a replied comment on Post
        console.log("Deleting a replied comment on Post");
        await axios
          .post(`http://127.0.0.1:8000/api/user/delete/${id}?token=${token}`)
          .then((res) => {
            console.log("delete reply res: ", res);
            console.log("props.comment_id: ", props.comment_id);
            contextComment.setComments((comments) =>
              comments.map((comment) => {
                if (comment.comment_id === props.comment_id) {
                  console.log(
                    "props.comment_id: ",
                    props.comment_id,
                    " comment.comment_id: ",
                    comment.comment_id
                  );
                  // Check if the reply exists before filtering
                  if (comment.replies) {
                    comment.replies = comment.replies.filter(
                      (item) => item.replay.id !== id
                    );
                    console.log("replies: ", comment);
                  }
                }
                return comment;
              })
            );
          });
        contextComment.set_id_reply(""); // Return to the natural position
      } else {
        // Deleting a replied comment on course
        console.log("Deleting a replied comment on course");
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/course/delete-replay/${id}?token=${token}`
          )
          .then((res) => {
            console.log("delete reply res: ", res);
            console.log("props.comment_id: ", props.comment_id);
            contextComment.setComments((comments) =>
              comments.map((comment) => {
                if (comment.comment_id === props.comment_id) {
                  console.log(
                    "props.comment_id: ",
                    props.comment_id,
                    " comment.comment_id: ",
                    comment.comment_id
                  );
                  // Check if the reply exists before filtering
                  if (comment.replies) {
                    comment.replies = comment.replies.filter(
                      (item) => item.replay.id !== id
                    );
                    console.log("replies: ", comment);
                  }
                }
                return comment;
              })
            );
          });
        contextComment.set_id_reply(""); // Return to the natural position
      }
    } catch (err) {
      console.error("Oops! There is an error:", err);
    }
  }
  // ======= end deleteComment ===========


  return (
    <div key={props.comment_id}>
      <div
        style={{ minWidth: "20rem" }}
        className={
          contextComment.id_reply === props.comment_id &&
          props.kind === "comment"
            ? "border-2 border-slate-300 style-comment"
            : contextComment.id_reply === props.reply_id &&
              props.kind === "reply"
            ? "border-2 border-slate-300 style-comment"
            : "style-comment"
        }
      >
        <div>
          <h1 className="text-gray-500 font-bold flex">
            {" "}
            <FaUserPen size={20} className="mr-3" /> {props.name}
            <span className="text-blue-400 ml-2">
              {" ("}
              {props.role === 2
                ? "Owner"
                : props.role === 1
                ? "Teacher"
                : "Student"}
              {") "}
            </span>
          </h1>
        </div>
        <p className="text-gray-500"> {props.text}</p>
        <div className="flex justify-between">
          <span className="flex ">
            <button
              onClick={() => {
                if (props.focusInput) props.focusInput();
                props.kind === "comment"
                  ? contextComment.set_id_reply(props.comment_id)
                  : contextComment.set_id_reply(props.reply_id);
              }}
              className="text-center text-blue-400 font-bold hover:text-dashbtnHover flex m-auto "
            >
              <PiArrowBendDownRightBold size={20} />
              reply
            </button>
            {props.id_user === currentUserId ? (
              <RiDeleteBin5Fill
                onClick={() => {
                  props.kind === "comment"
                    ? deleteComment(props.comment_id)
                    : deleteComment(props.reply_id);
                }}
                size={20}
                className="text-red-500 hover:text-dashbtnHover cursor-pointer ml-6"
              />
            ) : (
              ""
            )}
          </span>
          <div className="text-gray-400">
            {new Date(props.created_at).toString() === "Invalid Date"
              ? props.created_at
              : new Date(props.created_at).toLocaleString()}
          </div>
        </div>
      </div>
      <div className="translate-x-7">
        {props.replies?.map((item) => (
          <>
            <Comment
              key={item.replay.id}
              reply_id={item.replay.id}
              id_user={item.user.id}
              comment_id={props.comment_id}
              role={item.user.role}
              name={item.user.name}
              text={item.replay.content}
              kind={"reply"}
              it_is_for={props.it_is_for}
              created_at={item.replay.created_at}
              // replies={item.replay}
              focusInput={props.focusInput}
              // setIsItReplay={setIsItReplay}
            />
          </>
        ))}
      </div>
    </div>
  );
}
