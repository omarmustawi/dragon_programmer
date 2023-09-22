import { RiDeleteBin5Fill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { RiVideoAddFill } from "react-icons/ri";

export default function Table({
  header,
  data,
  handleDelete,
  currentUserId,
  handleVarify,
}) {
  // currentUserId if it is excit ... ; else don't interst it
  const currentUser = currentUserId || false;

  // handleVarify if it is excit ... ; else don't interst it
  const verifyFunction = handleVarify || false;

  // TO KNOW WHAT IS PAGE THAT I AM IN IT
  const location = new useLocation();

  // HEADER OF TABLE
  const headerShow = header.map((col, id) => (
    <th key={id} className="px-6 py-3 ">
      {" "}
      {col.name}{" "}
    </th>
  ));

  // BODY OF TABLE
  const bodyShow = data.map((row, id) => (
    <tr key={id} className="bg-white border-b relative hover:bg-slate-200">
      <td className="py-3 px-6"> {id + 1} </td>
      {header.map((cell, id) => (
        <td key={id} className="py-3 px-6">
          {
            cell.key === "role" // A- a)
              ? row[cell.key] === 2
                ? "Owner"
                : row[cell.key] === 1
                ? "Admin"
                : "User"
              : cell.key === "name" && row.id === currentUser // b)
              ? row[cell.key] + " (YOU)" // c)
              : row[cell.key] // d)
          }
        </td>
      ))}
      <td className="flex justify-around items-center align-baseline text-violet-600 py-3">
        {/* ======= icon -1- delete =======  */}
        {row.id !== currentUser &&
        row.role !== 2 &&
        !location.pathname.includes("allCoursesControllPannel") ? (
          <RiDeleteBin5Fill
            onClick={() => handleDelete(data[id].id)}
            className="text-red-500 cursor-pointer"
            size={30}
          />
        ) : (
          ""
        )}
        {/* ======= icon -2- verfy or edit  =======  */}
        {location.pathname.includes("newRegistration") ? (
          <button
            onClick={() => verifyFunction(data[id].id)}
            className="btnDash"
          >
            {" "}
            verify{" "}
          </button>
        ) : location.pathname.includes("allCoursesControllPannel") ? (
          <>
            <Link to={`${data[id].id}`}>
              <FiEdit size={30} />
            </Link>
            <Link to={`addVideo/${data[id].id}`}>
              <RiVideoAddFill size={30} />
            </Link>
          </>
        ) : (
          <Link to={`${data[id].id}`}>
            <FiEdit size={30} />
          </Link>
        )}
      </td>
    </tr>
  ));

  return (
    <table className=" w-11/12 m-auto my-6 text-center shadow-xl rounded-xl ">
      <thead className="rounded-xl">
        <tr className="bg-slate-400 text-gray-100 ">
          <th> Id </th>
          {headerShow}
          <th className="px-6 py-3 ">Action</th>
        </tr>
      </thead>
      <tbody>{bodyShow}</tbody>
    </table>
  );
}
