import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../images/loder.png.webp";
export default function Signup() {
  // DATA USER FOR SIGNUP
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // NAV AFTER LOGIN
  const navigate = useNavigate();

  // SUBMIT FORM SIGNUP
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      let res = await axios
        .post("http://127.0.0.1:8000/api/user/register", {
          name: user.name[0],
          email: user.email[0],
          password: user.password[0],
        })
      navigate("/login", { replace: true });
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: [e.target.value] });
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg">
      <div
        style={{ background: "rgb(255 211 211 / 67%)" }}
        className="text-white font-medium  rounded-3xl sm:w-2/4 lg:w-1/3 w-10/12  p-10"
      >
        {/* <VscBook className="bg-indigo-500 rounded-full  m-auto" style={{border: "10px solid "}} color="white" size={80} /> */}
        <span className="bg-white relative">
          <img src={logo} className="m-auto w-15" alt="" />
        </span>
        <h1 className="text-center text-indigo-500 pb-8 text-3xl"> Signup </h1>
        <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
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
            Signup
          </button>
          <Link to="/login" className="underline text-blue-400 text-center">
            I have already an account
          </Link>
        </form>
      </div>
    </div>
  );
}
