import axios from "axios";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AllComments } from "./Context/CommentsContext";
import { useContext } from "react";
import { token, currentUserId } from "../utility";

// http://127.0.0.1:8000/api/user/delete/23
export default function Comment(props) {
  const contextComment = useContext(AllComments);

  // ======= start deleteComment ===========
  async function deleteComment(id) {
    // =========

    console.log(
      "id: ",
      id,
      "props.kind: ",
      props.kind,
      "props.it_is_for: ",
      props.it_is_for
      , props.kind === "comment" && props.it_is_for === "post"
    );
    // ======================
    try {
      if (props.kind === "comment" && props.it_is_for === "post") {
        // Deleting a normal comment on a post
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
      } else {
        // Deleting a replied comment
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
      }
    } catch (err) {
      console.error("Oops! There is an error:", err);
    }
  }

  // ======= end deleteComment ===========

  return (
    <div key={props.comment_id}>
      <div
        style={{ minWidth: "15rem" }}
        className="bg-white py-2 px-7 rounded-3xl w-fit md:rounded-full  my-3 shadow-md relative"
      >
        <div>
          <h1 className="text-gray-500 font-bold">
            {" "}
            {props.name}
            <span className="text-blue-400">
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
        <p className="text-gray-500">
          {" "}
          {props.text} <br />
        </p>
        <button
          onClick={() => {
            contextComment.set_id_reply(props.comment_id);
          }}
          className="text-center m-auto"
        >
          <PiArrowBendDownRightBold
            size={20}
            className="text-gray-500 absolute left-7 bottom-1"
          />
        </button>
        {props.id_user === currentUserId ? (
          <RiDeleteBin5Fill
            onClick={() => {
              props.kind === "comment"
                ? deleteComment(props.comment_id)
                : deleteComment(props.reply_id);
            }}
            size={20}
            className="text-red-500 absolute left-24 bottom-1 cursor-pointer"
          />
        ) : (
          ""
        )}
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

              // replies={item.replay}
              // note="this is replayed 😂"
              // deleteComment={props.deleteComment}
              // focusInput={focusInput}
              // setIsItReplay={setIsItReplay}
            />
          </>
        ))}
      </div>
    </div>
  );
}
