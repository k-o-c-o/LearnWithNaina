import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import PageBanner from "../components/PageBanner";
import CourseTabs from "../components/CourseTabs";
import LessonCard from "../components/LessonCard";
import {getCourse,} from "../services/courseService";
import { getLessons,} from "../services/lessonService";
import AddLessonModal from "../components/AddLessonModal";
import "../styles/AdminCoursePage.css";


function AdminCoursePage() {

    const navigate = useNavigate();
    const [activeTab,setActiveTab]= useState("Lessons");
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);
    const [lessons, setLessons] = useState([]);
    const [showModal, setShowModal] =useState(false);
    
    useEffect(() => {
    loadData();
    }, [courseId]);

        const loadData = async () => {
            try {
                const courseData = await getCourse(courseId);
                const lessonData = await getLessons(courseId);

                setCourse(courseData);
                setLessons(lessonData);
            } catch (error) {
                console.error("Failed to load course data:", error);
            }
            };

    return(

        <AdminLayout>

            <PageBanner
                title={
                    course
                    ? course.title.toUpperCase()
                    : "LOADING..."
                }
            />

            <div className="course-page">

                <CourseTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                />

                {
                    activeTab==="Lessons" &&

                    <>
                        <div className="lesson-header">

                            <button
                                className="add-course-btn"
                                onClick={() => setShowModal(true)}
                            >
                                + Add Lesson
                            </button>

                        </div>

                        <div className="lesson-grid">
                            {lessons.map((lesson) => (
                                <LessonCard
                                key={lesson._id}
                                lesson={lesson}
                               onClick={() =>
                                    navigate(`/admin/lesson/${lesson._id}`)
                                }
                            />
                            ))}
                            </div>

                    </>
                }

                {
                    activeTab==="Students" &&

                    <h2>
                        Students Coming Soon...
                    </h2>
                }

                {
                    activeTab==="Grades" &&

                    <h2>
                        Grades Coming Soon...
                    </h2>
                }

            </div>

            {
                showModal &&

                <AddLessonModal

                courseId={courseId}

                onClose={() =>
                setShowModal(false)
                }

                onLessonCreated={loadData}

                />

            }

        </AdminLayout>

    );

}

export default AdminCoursePage;