import { useState } from "react";
import { FaRegCommentDots } from "react-icons/fa";

export default function Post(props) {
  const [readMore, setReadMore] = useState(true);
  return (
    <section className="mt-10 p-4 pb-10 bg-slate-50 rounded-xl shadow-sm border relative">
      <h1 className="text-blue-600 font-bold   lg:text-2xl text-lg mb-4">{props.name}</h1>
      <h1 className="text-slate-700 font-bold  lg:text-2xl text-lg mb-4">{props.title}</h1>
      <p
        style={{ whiteSpace: "pre-line" }}
        className={readMore ? " postStyle" : "postStyle max-h-full"}
      >
        {props.paragraph}
      </p>

      {readMore ? (
        <button
          onClick={() => setReadMore(false)}
          className="text-blue-600 lg:font-bold py-4"
        >
          READ MORE...
        </button>
      ) : (
        <button
          onClick={() => setReadMore(true)}
          className="text-blue-600 lg:font-bold  py-4"
        >
          hide ...
        </button>
      )}

      <button>
        <FaRegCommentDots
          size={24}
          className="text-zinc-600 absolute right-10 bottom-5"
        />
      </button>
    </section>
  );
}
