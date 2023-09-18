import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function Notefictions() {
  //  FOR STORE NOTEFICATIONS
  const [read, setRead] = useState([]);
  const [unRead, setUnRead] = useState([]);
  // TO GET TOKEN
  const cookie = new Cookies();
  const token = cookie.get("token");
  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/admin/notify/users?token=${token}`)
        .then((res) => setUnRead(res.data.data.unread_notifications));
      // .then((res) => console.log("res :", res.data )  );
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }, []);

  return (
    <>
      <h1>Notefictions</h1>
      { unRead.length === 0 ? (
        <h1 className="text-xl text-red-500 text-center font-semibold"> Oops! There is no any unread Notefiction. </h1>
      ) : (
        unRead
      )}
    </>
  );
}
