import { Outlet } from "react-router-dom";
import { role } from "../../utility";

export default function RequiredAuth({ allowedRole }) {
  console.log(typeof role);
  return <div>{role === 2 ? <Outlet /> : ""}</div>;
}
