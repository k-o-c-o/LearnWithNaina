import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  getEnrollments
} from "../services/enrollmentService";

import "../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] =
    useState([]);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    const enrollments =
      await getEnrollments(user.id);

    setCourses(enrollments);
  };

  return (
    <>
      <Navbar />

      <div className="dashboard-container">
        <h1>MY COURSES</h1>

        <div className="course-grid">
          {courses.map((enrollment) => (
            <div
                className="course-card"
                onClick={() =>
                    navigate(
                    `/course/${enrollment.courseId._id}`
                    )
                }
            >
              <div
                className="course-image"
              />

              <h3>
                {
                  enrollment.courseId
                    .title
                }
              </h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Dashboard;