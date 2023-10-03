import axios from "axios";
import Cookies from "universal-cookie";

export default function Logout() {
  const cookie = new Cookies();
  const token = cookie.get("token");
  // DELETE INFO CURRENT USER FROM COOKIE
  async function handleLogout() {
    try {
      await axios.post("http://127.0.0.1:8000/api/user/logout", {
        token,
      });
      cookie.remove("id");
      cookie.remove("token");
      cookie.remove("name");
      cookie.remove("email");
      cookie.remove("role");
      window.location.reload();
    } catch (err) {
      console.error("Oops! there is error: ", err);
    }
  }
  return (
    <button className="btn" onClick={handleLogout}>
      Logout
    </button>
  );
}
