import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import UploadPDFModal from "../components/UploadPDFModal";
import AdminLayout from "../layouts/AdminLayout";
import PageBanner from "../components/PageBanner";
import PDFCard from "../components/PDFCard";

import { getLesson } from "../services/lessonService";

function LessonWorkspace() {

    const navigate = useNavigate();
    const { lessonId } = useParams();

    const [lesson, setLesson] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        loadLesson();
    }, [lessonId]);

    const loadLesson = async () => {
        try {
            const data = await getLesson(lessonId);
            console.log("Lesson:", data);
            console.log("PDFs:", data.pdfs);
            setLesson(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (

        <AdminLayout>

            <PageBanner
                title={
                    lesson
                        ? lesson.title.toUpperCase()
                        : "LESSON"
                }
            />

            <div className="course-page">

                <div className="lesson-header">

                    <button
                        className="add-course-btn"
                        onClick={() => setShowModal(true)}
                    >
                        + Upload PDF
                    </button>

                </div>

                <div className="lesson-grid">

                    {lesson?.pdfs?.length === 0 ? (

                        <p>
                            No PDFs uploaded yet.
                        </p>

                    ) : (

                        lesson?.pdfs?.map((pdf, index) => (

                            <PDFCard

                                key={index}
                                pdf={pdf}
                                onClick={()=>
                                    navigate(
                                    `/admin/pdf/${lessonId}/${index}`
                                    )
                                }
                            />

                        ))

                    )}

                </div>

            </div>
                    {showModal && (
                        <UploadPDFModal
                            lessonId={lessonId}
                            onClose={() => setShowModal(false)}
                            onUploaded={loadLesson}
                        />
                    )}
        </AdminLayout>

    );

}

export default LessonWorkspace;