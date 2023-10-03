import { useState } from "react";
import { token } from "../../utility";
import axios from "axios";
import Alert from "../../components/Alert/Alert";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // TO STORE MESSAGE
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData();
    form.append("title", title);
    form.append("body", body);
    try {
       await axios
        .post(`http://127.0.0.1:8000/api/admin/post?token=${token}`, form)
        .then((res) => {
          setMessage(res.data.message);
        });
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }
  // How to learn english?
  return (
    <form onSubmit={handleSubmit} className="h-full">
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
      <button className="btnDash ml-50% -translate-x-1/2">Save</button>
      {message && <Alert message="message" />}
    </form>
  );
}
