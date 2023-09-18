
import Sidebar from "./Sidebar";
import { FaTools } from "react-icons/fa";
import { Outlet } from "react-router-dom";

export default function ControllPannel() {
  return (
    <section className="min-h-screen w-screen absolute bg-dash1">
      <div className="flex ">
        <Sidebar />
        <div
          style={{ width: "calc(100% -  12rem)" }}
          className="flex flex-col gap-2"
        >
          <h1 className="text-center pt-3 text-2xl font-semibold  text-violet-600 ">
            Controll Pannel <FaTools size={30} className=" inline-block" />{" "}
          </h1>
          <Outlet />
        </div>
      </div>
    </section>
  );
}
