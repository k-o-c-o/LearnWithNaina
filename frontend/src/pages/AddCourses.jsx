import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCourses } from "../services/courseService";
import { enrollStudent } from "../services/enrollmentService";

function AddCourses() {
  const [courses, setCourses] =
    useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const data = await getCourses();

    setCourses(data);
  };

  const handleEnroll =
async (courseId) => {
  try {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await enrollStudent(
      user.id,
      courseId
    );

    alert("Enrolled Successfully");
  } catch (error) {
    alert(
        error.response?.data?.message ||
        error.message
    );
  }
};

  return (
    <>
      <Navbar />

      <div style={{ padding: "40px" }}>
        <h1>Available Courses</h1>

        {courses.map((course) => (
          <div
                key={course._id}
                style={{
                    marginBottom: "20px"
                }}
                >
                {course.title}

                <button
                    onClick={() =>
                    handleEnroll(course._id)
                    }
                >
                    Enroll
                </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default AddCourses;