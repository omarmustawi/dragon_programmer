import { useContext, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import axios from "axios";
import { AiOutlineSend } from "react-icons/ai";
import { token } from "../../utility";
import { AllComments } from "../../components/Context/CommentsContext";

export default function Blogs() {
  // test
  const contextComment = useContext(AllComments);

  // =======

  // TO STORE POSTS
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    try {
      let res = axios
        .get(`http://127.0.0.1:8000/api/user/posts`)
        .then((res) => {
          console.log("res:", res.data.data);
          setPosts(res.data.data);
        });
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }, []);

  // current comment
  const [comment, setComment] = useState("");
  const [post_id, setPost_id] = useState("");
  // if current cumment is replay:
  // const [is_replay, set_is_replay] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);
    updateTextareaRows(e.target);
  };

  const updateTextareaRows = (textarea) => {
    const lineHeight = 24; // Adjust this value to match your textarea's line height
    const minRows = 1; // Set the minimum number of rows you want to display

    const currentRows = Math.max(
      minRows,
      Math.ceil(textarea.scrollHeight / lineHeight)
    );
    textarea.rows = currentRows;
  };

  // ============ start handle submit comment =============
  async function handleSubmit(e) {
    e.preventDefault();
    if (contextComment.id_reply === "") {
      try {
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/add-comment`,
            {
              content: comment,
              post_id: post_id,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log("resAdd Comment: ", res);
            contextComment.setComments([
              ...contextComment.comments,
              res.data.data,
            ]);
          });
      } catch (err) {
        console.error("Oops! There is an error: ", err);
      }
    } else {
      try {
        await axios
          .post(
            `http://127.0.0.1:8000/api/user/add-replay/${contextComment.id_reply}`,
            {
              replay: comment,
            },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          )
          .then((res) => {
            console.log("resAdd Comment: ", res);
            // Update the comments array to add the new reply
            contextComment.setComments((comments) =>
              comments.map((comment) => {
                if (comment.comment_id === contextComment.id_reply) {
                  return {
                    ...comment,
                    replies: [...comment.replies, res.data.data],
                  };
                }
                return comment;
              })
            );
            contextComment.set_id_reply('')
          });

      } catch (err) {
        console.error("Oops! There is an error: ", err);
      }
    }
  }
  // ============ end handle submit comment =============

  return (
    <>
      {/* <Loading /> */}

      <section className=" bg-grayColor min-h-minHeight">
        <article className="intro lg:h-72 flex justify-center items-center h-48">
          <h1 className="lg:text-5xl text-3xl text-white font-semibold">
            Blogs{" "}
          </h1>
        </article>
        <div className="lg:py-20 lg:px-20 py-5 px-5">
          {posts.map((post) => (
            <Post
              key={post.id}
              post_id={post.id}
              name={post.name}
              title={post.title}
              paragraph={post.body}
              created_at={post.created_at}
              setPost_id={setPost_id}
            />
          ))}

          <form onSubmit={handleSubmit} className="sticky bottom-2">
            <div className="flex bg-white p-3 border-2 border-slate-300  rounded-2xl">
              <textarea
                placeholder="Leave a comment ✨"
                className=" w-full  outline-none pr-14 "
                name="comment"
                value={comment}
                onChange={handleChange}
                rows="1"
                ref={(textarea) => textarea && updateTextareaRows(textarea)}
              />
              <button type="submit" className="relative">
                <AiOutlineSend
                  className="absolute -top-0 right-3 hover:text-green-700"
                  cursor={"pointer"}
                  size={30}
                  display={"inline"}
                />
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
