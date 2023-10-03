import { Outlet } from "react-router-dom";
import { role } from "../../utility";
import Err404 from "../Errors/Err404";

export default function RequiredAuth({ allowedRole }) {
  return <div>{allowedRole.includes(role) ? <Outlet /> : <Err404 />}</div>;
}
