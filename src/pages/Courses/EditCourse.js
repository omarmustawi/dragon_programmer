import { useLocation } from "react-router-dom";
import { Forma, currentUserId, token } from "../../utility";

export default function EditCourse() {
  // GET ID FOR COUSE WHICH I CHOOSE IT
  const location = new useLocation();
  let id = location.pathname;
  id = id.match(/\d+/);

  return (
    <>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        {" "}
        Edit Course{" "}
      </h1>
      <Forma
        api={`http://127.0.0.1:8000/api/admin/course/edit?token=${token}`}
        teacher_id={currentUserId}
        id_edit_course={id}
      />
    </>
  );
}
