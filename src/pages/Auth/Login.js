import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/loder.png.webp";
import axios from "axios";
import Cookies from "universal-cookie";
import Alert from "../../components/Alert/Alert";

export default function Login() {
  // DATA USER FOR LOGIN
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // NAV AFTER LOGIN
  const navigate = useNavigate();
  // COOKIE
  const cookie = new Cookies();
  // SUBMIT FORM LOGIN
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios
        .post("http://127.0.0.1:8000/api/user/login", {
          email: user.email[0],
          password: user.password[0],
        })

      // STORE COOKIE
      const token = res.data.data.token;
      const id = res.data.data.user_info.id;
      const name = res.data.data.user_info.name;
      const email = res.data.data.user_info.email;
      const role = res.data.data.user_info.role;
      cookie.set("token", token);
      cookie.set("id", id);
      cookie.set("name", name);
      cookie.set("email", email);
      cookie.set("role", role);

      // GO TO HOME
      navigate("/");

      // FOR token CHANGE
      window.location.reload();
    } catch (err) {
      console.log("err", err);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg">
      <div
        style={{ background: "rgb(255 211 211 / 67%)" }}
        className="text-white font-medium  rounded-3xl sm:w-2/4 lg:w-1/3 w-10/12   p-10"
      >
        {/* <VscBook className="bg-indigo-500 rounded-full  m-auto" style={{border: "10px solid "}} color="white" size={80} /> */}
        <span className="bg-white relative">
          <img src={logo} className="m-auto w-15" alt="" />
        </span>
        <h1 className="text-center text-indigo-500 pb-8 text-3xl"> Login </h1>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button
            style={{
              transition: "color 3s linear",
              animationDelay: "3s",
            }}
            className="m-auto btn"
          >
            {" "}
            Login{" "}
          </button>
          <Link to="/signup" className="underline text-blue-400 text-center">
            {" "}
            Create an account{" "}
          </Link>
        </form>
      </div>
    </div>
  );
}
