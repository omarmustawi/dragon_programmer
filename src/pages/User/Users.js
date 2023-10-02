import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../dashboard/Table";
import { token, currentUserId } from "../../utility";

export default function Users() {
  // STORE ALL USERS IN STATE
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/users?token=${token}`)
      .then((res) => setUsers(res.data.data))
      .catch((err) => console.log("Opps! There is an error:", err));
  }, []);

  // DELETE USER
  function handleDelete(id) {
    console.log("id: ", id);
    axios
      .delete(
        `http://127.0.0.1:8000/api/admin/user/delete/${id}?token=${token}`
      )
      .then((res) => console.log("res: ", res))
      .then((res) => setUsers((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) => console.error("Oops! there is an error: ", err));
  }

  console.log("users", users);

  // HEADER FOR TABLE
  const header = [
    {
      key: "name",
      name: "Name",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
  ];
  return (
    <Table
      header={header}
      data={users}
      handleDelete={handleDelete}
      currentUserId={currentUserId}
    />
  );
}
