import axios from "axios";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { AllComments } from "./Context/CommentsContext";
import { useContext, useState } from "react";
import { token } from "../utility";

// http://127.0.0.1:8000/api/user/delete/23
export default function Comment(props) {
  const contextComment = useContext(AllComments);
  // is reply we want to delete?
  // const [is_reply, set_is_reply] = useState(false);

  // ======= start deleteComment ===========
  async function deleteComment(id) {
    console.log("props.kind: ", props.kind);
    if (props.kind === "comment") {
      // it means we want to delete a normal comment
      try {
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/delete-comment?token=${token}`,
            { post_id: id } // it has to be comment_id but this is mistake from backend
          )
          .then((res) => {
            console.log("delete comment res: ", res);
            contextComment.setComments((prev) =>
              prev.filter((item) => item.comment_id !== id)
            );
          });
      } catch (err) {
        console.error("Oops! There is an error:", err);
      }
    } else {
      // we wanna delete a replied comment
      try {
        await axios
          .post(`http://127.0.0.1:8000/api/user/delete/${id}?token=${token}`)
          .then((res) => {
            console.log("delete reply res: ", res);
            contextComment.setComments((comments) =>
              comments.map((comment) => {
                if (comment.comment_id === contextComment.id_reply) {
                  // Filter out the reply from the replies array
                  comment.replies = comment.replies.filter(
                    (item) => item.id !== id
                  );
                }
                return comment;
              })
            );
          });
        contextComment.set_id_reply(""); // return into natural position
      } catch (err) {
        console.error("Oops! There is an error:", err);
      }
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
        <RiDeleteBin5Fill
          onClick={() => deleteComment(props.comment_id)}
          size={20}
          className="text-red-500 absolute left-24 bottom-1 cursor-pointer"
        />
      </div>
      <div className="translate-x-7">
        {props.replies?.map((item) => (
          <>
            <Comment
              key={item.replay.id}
              comment_id={item.replay.id}
              role={item.user.role}
              name={item.user.name}
              text={item.replay.content}
              kind={"reply"}
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
