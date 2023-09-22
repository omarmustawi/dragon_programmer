import axios from "axios";
import Table from "./Table";
import { useEffect, useState } from "react";
import { token } from "../../utility";

export default function NewRegistration() {
  // TO STORE NEW REGISTRATION
  const [newRegistration, setNewRegistration] = useState([]);
  // TO GET NEW REGISTERATION
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/admin/new?token=${token}`)
      .then((res) => {
        console.log("new: ", newRegistration);
        setNewRegistration(res.data.data);
      });
    // .then((res) => setNewRegistration(res.data.data));
  }, []);

  const header = [
    {
      key: "name",
      name: "Name",
    },
    {
      key: "email",
      name: "Email",
    },
  ];

  // DELETE USER
  function handleDelete(id) {
    console.log("id: ", id);
    axios
      .delete(
        `http://127.0.0.1:8000/api/admin/user/delete/${id}?token=${token}`
      )
      .then((res) =>
        setNewRegistration((prev) => prev.filter((item) => item.id !== id))
      )
      .catch((err) => console.error("Oops! there is an error: ", err));
  }

  //   handle Varify function
  function handleVarify(id) {
    console.log("the id user that i will varify: ", id);
    axios
      .post(`http://127.0.0.1:8000/api/admin/user/verify/${id}?token=${token}`)
      .then((res) => console.log("res of varify: ", res))
      .then((res) =>
        setNewRegistration((prev) => prev.filter((item) => item.id !== id))
      );
  }
  return (
    <section>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        newRegistration
      </h1>
      {newRegistration.length > 0 ? (
        <Table
          header={header}
          data={newRegistration}
          handleDelete={handleDelete}
          handleVarify={handleVarify}
        />
      ) : (
        <h1 className="text-xl text-red-400 text-center my-6 font-bold flex justify-center items-center gap-4">
          {" "}
          Oops! There Is No Any New Registration <span className="text-4xl "> 😥 </span>
        </h1>
      )}
    </section>
  );
}
