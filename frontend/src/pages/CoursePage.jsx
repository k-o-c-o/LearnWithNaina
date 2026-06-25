import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { getLessons } from "../services/lessonService";

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

      <div className = "page-container" style={{ padding: "40px" }}>
        <h1>Lessons</h1>

        {lessons.map((lesson) => (
          <div
            key={lesson._id}
            onClick={() =>
                navigate(
                `/lesson/${lesson._id}`
                )
            }
            style={{
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                cursor: "pointer"
            }}
            >
            {lesson.title}
          </div>
        ))}
      </div>
    </>
  );
}

export default CoursePage;