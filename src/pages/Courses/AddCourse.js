import { Forma, currentUserId, token } from "../../utility";

export default function AddCourse() {
  return (
    <>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        {" "}
        AddCourse{" "}
      </h1>
      <Forma
        api={`http://127.0.0.1:8000/api/admin/course/insert?token=${token}`}
        teacher_id={currentUserId}
        id_edit_course={false}
      />
    </>
  );
}
