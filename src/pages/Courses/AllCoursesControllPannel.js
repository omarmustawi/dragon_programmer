import axios from "axios";
import { useEffect, useState } from "react";
import Table from "../dashboard/Table";

export default function AllCoursesControllPannel() {
  // TO STORE COURSES
  const [courses, setCourses] = useState([]);

  // get courses from back
  async function getCourses() {
    try {
      let res = await axios.get("http://127.0.0.1:8000/api/user/courses");
      setCourses(res.data.data);
    } catch (err) {
      console.error("Oops! There is an error: ", err);
    }
  }


  useEffect(() => {
    getCourses();
  }, []);

  // HEADER FOR TABLE
  const header = [
    {
      key: "title",
      name: "Title",
    },
    {
      key: "level",
      name: "Level",
    },
    {
      key: "price",
      name: "Price",
    },
    {
      key: "name",
      name: "Teacher",
    },
  ];

  return (
    <section>
      <h1 className="text-center text-xl font-semibold text-dashbtn">
        The Controll Pannel For All Courses
      </h1>
      <Table header={header} data={courses}  />
    </section>
  );
}
