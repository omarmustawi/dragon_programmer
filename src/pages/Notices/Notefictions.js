import axios from "axios";
import { useEffect, useState } from "react";
import { token } from "../../utility";
import { Link } from "react-router-dom";

export default function Notefictions() {
  //  FOR STORE NOTEFICATIONS
  const [read, setRead] = useState([]);
  const [unRead, setUnRead] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/admin/notify/users?token=${token}`)
        .then((res) => {
          console.log("res :", res);
          setUnRead(res.data.data.unread_notifications);
          setRead(res.data.data.readed_notifications);
        });
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }, []);
  console.log(read);

  return (
    <>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        Notefictions
      </h1>
      {/* unReaded */}
      <div className="text-center ">
        {typeof unRead === "string" ? (
          <h1 className="text-xl text-red-500 text-center font-semibold">
            {" "}
            Oops! There is no any unread Notefiction.{" "}
          </h1>
        ) : (
          unRead.map((item) => (
            <Link
              to={`/controllPannel/newRegistration`}
              className="w-11/12 mx-auto my-2 bg-cyan-50  rounded-lg shadow-md flex flex-col md:flex-row justify-around text-slate-600"
            >
              <div className="text-start flex flex-wrap ">
                <span className="px-5 text-left md:py-1 ">
                  Name: <span className="text-sky-700"> {item.name} </span>{" "}
                </span>
                <span className="px-5 text-left md:py-1 ">
                  Email: <span className="text-amber-600"> {item.email} </span>{" "}
                </span>
              </div>
              <div className="text-start flex flex-wrap ">
                <span  className="px-5 text-left md:py-1 ">
                  The account needs to verify{" "}
                </span>
                <span  className="px-5 text-left md:py-1 ">
                  It was created since:{" "}
                  <span className="text-sky-700 font-semibold">
                    {" "}
                    {item.created_at}{" "}
                  </span>
                </span>
              </div>
            </Link>
          ))
        )}
      </div>

      {/* readed */}
      <div className="text-center ">
        {typeof read === "string" ? (
          <h1 className="text-xl text-red-500 text-center font-semibold">
            {" "}
            Oops! There is no any unread Notefiction.{" "}
          </h1>
        ) : (
          read.map((item) => (
            <Link
              to={`/controllPannel/users/${item.id}`}
              className="w-11/12 mx-auto my-2 bg-white  rounded-lg shadow-md flex flex-col md:flex-row  text-slate-600"
            >
              <div className="text-start flex flex-wrap ">
                <span className="px-5 text-left md:py-1 ">
                  {" "}
                  Name: <span className="text-sky-700"> {item.name} </span>{" "}
                </span>
                <span className="px-5 text-left md:py-1 ">
                  Email: <span className="text-amber-600"> {item.email} </span>{" "}
                </span>
              </div>
              <div className="text-start flex flex-wrap ">
                <span className="px-5 text-left md:py-1 ">
                  The account was verified since{" "}
                  <span className="text-sky-700 font-semibold">
                    {" "}
                    {item.verify}{" "}
                  </span>{" "}
                  by <span className="text-sky-700"> {item.verifyBy} </span>{" "}
                </span>
                <span className="px-5 text-left md:py-1 ">
                  It was created since:{" "}
                  <span className="text-sky-700 font-semibold">
                    {" "}
                    {item.created_at}{" "}
                  </span>
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
}
