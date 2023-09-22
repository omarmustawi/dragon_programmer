import { Link } from "react-router-dom";
export default function Home() {
  return (
    <div className="bg">
      <div className="ml-20 h-full flex justify-center   flex-col gap-9 ">
        <h1 className="text-white lg:text-5xl text-xl font-semibold">
          Online learning platform
        </h1>
        <p className="text-white lg:text-3xl text-lg font-normal">
          Build skills with our courses, certificates,
          <br /> and degrees online from world-class
          <br /> universities and companies
        </p>
        <Link className="btn text-white" to={"/signup"}>
          {" "}
          Join Our{" "}
        </Link>
      </div>
    </div>
  );
}
