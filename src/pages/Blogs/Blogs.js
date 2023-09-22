import { useEffect } from "react";
import Loading from "../../components/Loading";
import Post from "../../components/Post";
import axios from "axios";
import { token } from "../../utility";

export default function Blogs() {

  useEffect(() => {
    try {
      let res = axios.get(`http://127.0.0.1:8000/api/user/posts?token=${token}`);
      console.log("res:", res);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }, []);

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
          {/* {data.map((post, key) => (
            <Post
              key={key}
              name={post.name}
              title={post.title}
              paragraph={post.paragraph}
            />
          ))} */}
        </div>
      </section>
    </>
  );
}
