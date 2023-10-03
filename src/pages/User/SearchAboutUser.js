import { useEffect, useState } from "react";
import axios from "axios";
import Table from "../dashboard/Table";
// I WILL IMPORT token and currentUserId FRPM utility file
import { currentUserId, token } from "../../utility";

export default function SearchAboutUser() {
  // IS THE BUTTON DISABLED
  const [isDisabled, setIsDisabled] = useState(true);

  // STORE DATA AFTER SEARCH
  const [dataSearch, setDataSearch] = useState([]);

  // THE USER THAT I HAVE LOOKED FOR HIM
  const [search, setSearch] = useState("");

  // HANDLE SEARCH ABOUT USER
  async function handleSearch() {
    let res = await axios.post(`http://127.0.0.1:8000/api/user/search`, {
      search,
    });
    setDataSearch(res.data.data);
  }

  // DELETE USER
  function handleDelete(id) {
    axios
      .delete(
        `http://127.0.0.1:8000/api/admin/user/delete/${id}?token=${token}`
      )
      .then((res) =>
        setDataSearch((prev) => prev.filter((item) => item.id !== id))
      )
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

  // useEffect for change disabled every time a user input thing
  useEffect(() => {
    setIsDisabled(search.length > 0 ? false : true);
  }, [search]);
  // THE useEffect HOOK IS VERY USEFULL ): 👆
  return (
    <section className="mx-auto w-full flex-col flex align-middle">
      <h1 className="text-center text-xl font-semibold text-dashbtn">SearchAboutUser </h1>
      <input
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="inputDas"
        type="search"
        placeholder="Search About A User"
      />
      <button
        disabled={isDisabled}
        style={{ background: isDisabled ? "#e66666" : "" }}
        className={`btnDash w-24 m-auto`}
        onClick={handleSearch}
      >
        Search
      </button>
      {dataSearch.length > 0 ? (
        <Table
          header={header}
          data={dataSearch}
          handleDelete={handleDelete}
          currentUserId={currentUserId}
        />
      ) : (
        <h1 className="text-xl text-red-400 text-center my-6 font-bold flex justify-center items-center gap-4">
          {" "}
          Oops! There Is No Any Result <span className="text-4xl "> 😥 </span>
        </h1>
      )}
    </section>
  );
}
