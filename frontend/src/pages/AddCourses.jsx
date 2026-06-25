import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getCourses } from "../services/courseService";
import { enrollStudent } from "../services/enrollmentService";
import "../styles/AddCourses.css";
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

        <div className="dashboard-container">

    <h1>AVAILABLE COURSES</h1>

    <div className="course-grid">

        {courses.map((course) => (

            <div
                key={course._id}
                className="course-card"
            >

                <img
                    src={course.image}
                    alt={course.title}
                    className="course-image"
                />

                <div className="course-content">

                    <h3>{course.title}</h3>

                    <p className="course-description">
                        {course.description}
                    </p>

                    <button
                        className="enroll-btn"
                        onClick={() => handleEnroll(course._id)}
                    >
                        Enroll
                    </button>

                </div>

            </div>

        ))}

    </div>

</div>
    
    </>
  );
}

export default AddCourses;