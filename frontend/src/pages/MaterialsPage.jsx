import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLesson } from "../services/lessonService";
import "../styles/CoursePage.css";

function MaterialsPage() {
    const navigate = useNavigate();
    const { lessonId } = useParams();

    const [lesson, setLesson] = useState(null);

    useEffect(() => {
        loadLesson();
    }, []);

    const loadLesson = async () => {
        try {
            const data = await getLesson(lessonId);
            setLesson(data);
        } catch (error) {
            console.error(error);
        }
    };

    if (!lesson) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Navbar />

            <div className="page-container">

              <div className="dashboard-header">

                  <h1>Materials</h1>

                  <p>
                      Select a document to begin learning.
                  </p>

              </div>

              {lesson.pdfs.length === 0 ? (

                  <div className="empty-state">

                      <h2>No materials available</h2>

                  </div>

              ) : (

                  <div className="lesson-grid">

                      {lesson.pdfs.map((pdf, index) => (

                          <div
                              key={index}
                              className="lesson-card"
                              onClick={() =>
                                  navigate(`/material/${lessonId}/${index}`)
                              }
                          >

                              <h2>📄 {pdf.title}</h2>

                          </div>

                      ))}

                  </div>

                 )}

            </div>
                    
                
        </>
    );
}

export default MaterialsPage;