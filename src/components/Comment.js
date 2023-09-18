import { PiArrowBendDownRightBold } from "react-icons/pi";

export default function Comment(props) {
  return (
    <div className="bg-white py-2 px-5 rounded-3xl md:rounded-full w-fit my-3 shadow-md relative">
      <h1 className="text-gray-500"> {props.name} </h1>
      <p> {props.text} </p>
      <button className="text-center m-auto">
        <PiArrowBendDownRightBold size={20}  className="text-gray-500 absolute left-7 bottom-1" />
      </button>
    </div>
  );
}
