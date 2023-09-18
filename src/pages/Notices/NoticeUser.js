import { useEffect, useState } from "react";
import axios from "axios";
import { token } from "../../utility";
import { Link } from "react-router-dom";

const Notice = (props) =>
  props.mesage.length ? (
    props.mesage.map((item) => (
      <Link
        to={`/${item.course_id}`}
        key={item.id}
        className={"notice bg-blue-100 font-bold"}
      >
        <h1>
          {" "}
          One Video is added to course {item.course_name} By {item.teacher_info}{" "}
        </h1>
      </Link>
    ))
  ) : (
    <h1 className="text-lg mb-3 text-center text-red-600 font-bold"> {`There is not any ${props.kind} notification ...!`} </h1>
  );

export default function NoticeUser() {
  //  FOR STORE NOTEFICATIONS
  const [read, setRead] = useState([]);
  const [unRead, setUnRead] = useState([]);

  async function notices() {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/user/notifications?token=${token}`)
        .then((res) => {
          console.log("res: ", res);
          setRead(res.data.data.readed_notifications);
          setUnRead(res.data.data.unread_notifications);
        });
      console.log("read:", read);
      console.log("unread:", unRead);
    } catch (err) {
      console.error("Oops! there is an error:", err);
    }
  }

  useEffect(() => {
    notices();
  }, []);
  return (
    <div className="min-h-minHeight">
      <h1 className="intro h-32 lg:h-52 font-bold lg:text-4xl text-2xl flex justify-center items-center text-white">
        Notices
      </h1>
      <section className="sm:p-10 p-3 ">
        <div className=" rounded-2xl ">
          <Notice mesage={read} kind="Read" />
          <Notice mesage={unRead} kind="Unread" />
        </div>
      </section>
    </div>
  );
}
