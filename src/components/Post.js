import { useContext, useState } from "react";
import { BiSolidCommentEdit } from "react-icons/bi";
import { FaUserTie } from "react-icons/fa";
import Comment from "./Comment";
import axios from "axios";
import { AllComments } from "./Context/CommentsContext";

export default function Post(props) {
  // to read whole post
  const [readMore, setReadMore] = useState(true);

  const contextComment = useContext(AllComments);

  console.log("comments: " , contextComment.comments);

  async function getComment() {
    try {
      await axios
        .get(`http://127.0.0.1:8000/api/user/comments?id=${props.post_id}`)
        .then((res) => {
          console.log("comments: ", res.data.data);
          contextComment.setComments(res.data.data); // put comments in [comments state]
          props.setPost_id(props.post_id); // get post_id to submit a current comment
        });
      contextComment.set_post_id(props.post_id); // to select one post to display its comments not all posts
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }
  return (
    <>
      <section className="mt-10 p-4 bg-slate-50 rounded-xl shadow-sm border relative">
        <h1 className="text-blue-600 font-bold flex items-center  lg:text-2xl text-lg mb-4">
          <FaUserTie className="mr-4" size={30} /> {props.user}
        </h1>
        <h1 className="text-slate-700 font-bold  lg:text-2xl text-lg mb-4">
          {props.title}
        </h1>
        <p style={{ whiteSpace: "pre-line" }} className={" postStyle"}>
          {props.body.length > 200 && readMore
            ? props.body.slice(0, 200) + "..."
            : props.body}
        </p>

        {readMore && props.body.length > 200 ? (
          <button
            onClick={() => setReadMore(false)}
            className="text-blue-300 hover:text-blue-400 lg:font-bold py-4"
          >
            READ MORE...
          </button>
        ) : props.body.length > 200 ? (
          <button
            onClick={() => setReadMore(true)}
            className="text-blue-300 hover:text-blue-400 lg:font-bold  py-4"
          >
            hide ...
          </button>
        ) : (
          ""
        )}

        {/* ================== bottom of post ============ */}
        <div className="text-gray-500 flex justify-between  bottom-5">
          <button
            onClick={getComment}
            className="flex gap-2 hover:text-green-700"
          >
            <BiSolidCommentEdit size={24} />
            Comments
          </button>
          <p> {props.created_at} </p>
        </div>
        {/* ================ COMMENTS =====================  */}
      </section>

      {contextComment.post_id === props.post_id && ( // if the post that I wanna display comments is the same this post ==> display  its comments
        <div className="bg-gray-100 border py-4 pl-8 rounded-lg mt-1">
          {contextComment.comments.map((item) => (
            <Comment
              key={item.comment_id}
              id_user={item.user.id}
              comment_id={item.comment_id}
              name={item.user.name}
              role={item.user.role}
              text={item.content}
              replies={item.replies}
              kind={"comment"}
              it_is_for={"post"}
              created_at={props.created_at}
            />
          ))}
        </div>
      )}
    </>
  );
}
