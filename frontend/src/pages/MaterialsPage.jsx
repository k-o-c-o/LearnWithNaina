import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLesson } from "../services/lessonService";

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

            <div style={{ padding: "40px" }}>
                <h1>{lesson.title}</h1>

                {lesson.pdfs.length === 0 ? (
                    <p>No PDFs uploaded yet.</p>
                ) : (
                    lesson.pdfs.map((pdf, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                navigate(`/material/${lessonId}/${index}`)
                            }
                            style={{
                                border: "1px solid #ddd",
                                padding: "20px",
                                marginBottom: "20px",
                                cursor: "pointer"
                            }}
                        >
                            📄 {pdf.title}
                        </div>
                    ))
                )}
            </div>
        </>
    );
}

export default MaterialsPage;