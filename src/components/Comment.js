import axios from "axios";
import { PiArrowBendDownRightBold } from "react-icons/pi";
import { RiDeleteBin5Fill } from "react-icons/ri";

export default function Comment(props) {

  return (
    <div key={props.comment_id}>
      <div
        style={{ minWidth: "15rem" }}
        className="bg-white py-2 px-7 rounded-3xl w-fit md:rounded-full  my-3 shadow-md relative"
      >
        <div>
          <h1 className="text-gray-500 font-bold">
            {" "}
            {props.name}
            <span className="text-blue-400">
              {" ("}
              {props.role === 2
                ? "Owner"
                : props.role === 1
                ? "Teacher"
                : "Student"}
              {") "}
            </span>
          </h1>
        </div>
        <p>
          {" "}
          {props.text} <br /> {props.note}
        </p>
        <button
          onClick={() => {
            props.focusInput();
            props.setIsItReplay(props.comment_id);
          }}
          className="text-center m-auto"
        >
          <PiArrowBendDownRightBold
            size={20}
            className="text-gray-500 absolute left-7 bottom-1"
          />
        </button>
        <RiDeleteBin5Fill
          onClick={() => props.deleteComment(props.comment_id)}
          size={20}
          className="text-red-500 absolute left-24 bottom-1 cursor-pointer"
        />
      </div>
      <div className="translate-x-7">
        {props.replies?.map((item) => (
          <>
            <Comment
              key={item.replay.id}
              comment_id={item.replay.id}
              role={item.user.role}
              name={item.user.name}
              text={item.replay.content}
              // replies={item.replay}
              note="this is replayed 😂"
              deleteComment={props.deleteComment}
              // focusInput={focusInput}
              // setIsItReplay={setIsItReplay}
            />
          </>
        ))}
      </div>
    </div>
  );
}
