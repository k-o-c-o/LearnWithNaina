import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLessons } from "../services/lessonService";
import "../styles/CoursePage.css";

function CoursePage() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [lessons, setLessons] =
    useState([]);

  useEffect(() => {
    loadLessons();
  }, []);

  const loadLessons = async () => {
    const data =
      await getLessons(courseId);

    setLessons(data);
  };

  return (
    <>
        <Navbar />

        <div className="page-container">

            <div className="dashboard-header">

                <h1>Lessons</h1>

                <p>
                    Follow the lessons below to complete this course.
                </p>

            </div>

            {lessons.length === 0 ? (

    <div className="empty-state">

        <h2>No lessons available</h2>

        <p>
            Lessons will appear here once they are added.
        </p>

    </div>

) : (

<div className="lesson-grid">

                {lessons.map((lesson, index) => (

                    <div
                        key={lesson._id}
                        className="lesson-card"
                        onClick={() =>
                            navigate(`/lesson/${lesson._id}`)
                        }
                    >

                        <h2>
                            📖 {lesson.title}
                        </h2>

                        <p>
                            View Materials →
                        </p>

                    </div>

                ))}

                        </div>

        )}

        </div>

    </>
  );
}

export default CoursePage;