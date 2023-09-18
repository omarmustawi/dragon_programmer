import axios from "axios";
import { useEffect, useState } from "react";
import Table from "./Table";
import { currentUserId, token } from "../../utility";

export default function AllAdmins() {
  // TO STORE ADMINS
  const [admins, setAdmins] = useState([]);
  console.log("admins", admins);

  // TO GET ADMINS   ////////////////////////////////////////////////////// HERE I HAVE ERROR I WILL RETURN LATER
  const  getAdmins = async  () => {
    try {
      await axios
        .get(`http://127.0.0.1:8000/api/admin/admins?token=${token}`)
        .then((res) => console.log("resAdmin: ", res));
    } catch (err) {
      console.error("Oops! there is an error: ", err);
    }
  };
  useEffect(() => {
    getAdmins();
  }, []);

  // DELETE USER
  function handleDelete(id) {
    console.log("id: ", id);
    axios
      .delete(
        `http://127.0.0.1:8000/api/admin/user/delete/${id}?token=${token}`
      )
      .then((res) => console.log("res: ", res))
      .then((res) => setAdmins((prev) => prev.filter((item) => item.id !== id)))
      .catch((err) => console.error("Oops! there is an error: ", err));
  }

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
    <>
      <h1 className="text-center">
        {" "}
        AllAdmins{" "}
        <span className="text-red-400">
          {" "}
          Here even owners are showed!!!{" "}
        </span>{" "}
      </h1>
      <Table
        header={header}
        data={admins}
        handleDelete={handleDelete}
        currentUserId={currentUserId}
      />
    </>
  );
}
