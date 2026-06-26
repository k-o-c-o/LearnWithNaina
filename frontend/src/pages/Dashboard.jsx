import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

import {
  getStudentEnrollments
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
      await getStudentEnrollments(user.id);

    setCourses(enrollments);
  };

  return (
    <>
        <Navbar />

        <div className="page-container">

            <div className="dashboard-header">

                <h1>My Courses</h1>

                <p>
                    Continue learning from your enrolled courses.
                </p>

            </div>

            {courses.length === 0 ? (

            <div className="empty-state">

                <h2>No courses enrolled yet</h2>

                <p>
                    Visit the Add Courses page to start learning.
                </p>

            </div>

            ) : (

            <div className="course-grid">

                {courses.map((enrollment) => (

                    <div
                        key={enrollment._id}
                        className="course-card"
                        onClick={() =>
                            navigate(`/course/${enrollment.courseId._id}`)
                        }
                    >

                        <img
                            src={enrollment.courseId.image}
                            alt={enrollment.courseId.title}
                            className="course-image"
                        />

                        <div className="course-info">

                            <h3>
                                {enrollment.courseId.title}
                            </h3>

                            <p>
                                View Lessons →
                            </p>

                        </div>

                    </div>

                ))}

             </div>

            )}

        </div>

    </>
  );
}

export default Dashboard;