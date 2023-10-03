import { useEffect, useState } from "react";
import axios from "axios";
import { Notice, token } from "../../utility";

export default function NoticeUser() {
  //  FOR STORE NOTEFICATIONS
  const [read, setRead] = useState([]);
  const [unRead, setUnRead] = useState([]);



  async function notices() {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/user/notifications?token=${token}`)
        .then((res) => {
          setRead(res.data.data.readed_notifications);
          // if( res.data.data.new_registration)
          setUnRead(res.data.data.unread_notifications);
        });
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
