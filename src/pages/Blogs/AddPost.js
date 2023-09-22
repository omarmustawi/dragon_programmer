import { useState } from "react";
import { name, token } from "../../utility";
import axios from "axios";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  console.log("title: ", title);
  console.log("body: ", body);
  console.log("name: ", name);

  async function handleSubmit() {
    try {
      let res = await axios.post(
        `http://127.0.0.1:8000/api/admin/post`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }, // Corrected "Authentication" to "Authorization"
        },
        {
          title: title,
          body: body,
        }
      );
      console.log("result:" , res );
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }

  return (
    <form className="h-full">
      <input
        type="text"
        value={title}
        name="title"
        placeholder="title..."
        className="inputDas"
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="inputDas bg-transparent mx-auto  focus:outline-none h-1/2"
        placeholder="text..."
        value={body}
        name="body"
        onChange={(e) => setBody(e.target.value)}
      />
      <button
        className="btnDash ml-50% -translate-x-1/2"
        onClick={handleSubmit}
      >
        Save
      </button>
    </form>
  );
}
