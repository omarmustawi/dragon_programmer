import axios from "axios";
import { useEffect, useState } from "react";
import { token } from "../../utility";

export default function Events() {
  const [events, set_events] = useState([]);
  useEffect(() => {
    try {
      axios
        .get(`http://127.0.0.1:8000/api/admin/events?token=${token}`)
        .then((res) => {
          console.log("res: ", res);
          set_events(res.data.data);
        });
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }, []);

  return (
    <div>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        {" "}
        All Events{" "}
      </h1>
      <table className=" w-11/12 m-auto my-6 text-center shadow-xl rounded-xl ">
        <thead className="rounded-xl">
          <tr className="bg-slate-400 text-gray-100 ">
            <th className="p-3 "> Id </th>
            <th className="px-6 py-3 "> Event </th>
            <th className="px-6 py-3 "> Created At </th>
          </tr>
        </thead>
        <tbody className="rounded-xl bg-white">
          {events.map((item, key) => (
            <tr className="bg-white border-b relative hover:bg-slate-200">
              <td className="p-3 "> {key + 1} </td>
              <td className="p-3 md:border-x-2"> {item.event} </td>
              <td className="p-3 ">
                {" "}
                {new Date(item.created_at).toLocaleString()}{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
