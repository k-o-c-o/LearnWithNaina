import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseCard from "../components/CourseCard";
import { getCourses } from "../services/courseService";
import AddCourseModal from "../components/AddCourseModal";
import AdminLayout from "../layouts/AdminLayout";
import "../styles/AdminDashboard.css";

function AdminDashboard() {

    const [courses,setCourses]=useState([]);
    const [showModal, setShowModal] = useState(false);

    const navigate=useNavigate();

    useEffect(()=>{

        loadCourses();

    },[]);

    const loadCourses=async()=>{

        const data=await getCourses();

        setCourses(data);

    }

    return(

        <AdminLayout>

            <div className="admin-container">

            <div className="admin-header">

                <h1>
                    Admin Dashboard
                </h1>

                <button
                    className="add-course-btn"
                    onClick={() => setShowModal(true)}
                    >
                    + Add Course
                </button>

            </div>

            <div className="course-grid">

                {
                    courses.map(course=>

                        <CourseCard

                        key={course._id}

                        course={course}

                        onClick={()=>navigate(
                            `/admin/course/${course._id}`
                        )}

                        />

                    )
                }

            </div>

        {
            showModal && (
                <AddCourseModal
                    onClose={() => setShowModal(false)}
                    onCourseCreated={loadCourses}
                />
            )
        }

        </div>

        </AdminLayout>

    );

}

export default AdminDashboard;