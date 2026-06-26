import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCourses from "./pages/AddCourses";
import Grades from "./pages/Grades";
import CoursePage from "./pages/CoursePage";
import MaterialsPage from "./pages/MaterialsPage";
import PDFViewer from "./pages/PDFViewer";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOnly from "./components/AdminOnly";
import StudentsEnrolled from "./pages/StudentsEnrolled";
import AdminCoursePage from "./pages/AdminCoursePage";
import LessonWorkspace from "./pages/LessonWorkspace";
import AdminPDFViewer from "./pages/AdminPDFViewer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-courses" element={<AddCourses />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/course/:courseId" element={<CoursePage />}/>
        <Route path="/lesson/:lessonId" element={<MaterialsPage />}/>
        <Route path="/material/:lessonId/:pdfIndex" element={<PDFViewer />}/>
        <Route path="/admin" element={<AdminOnly> <AdminDashboard /> </AdminOnly>}/>
        <Route path="/admin/course/:courseId/students" element={ <AdminOnly> <StudentsEnrolled/> </AdminOnly>}/>
        <Route path="/admin/course/:courseId" element={<AdminOnly> <AdminCoursePage/></AdminOnly>}/>
        <Route path="/admin/lesson/:lessonId" element={ <AdminOnly><LessonWorkspace /></AdminOnly>}/>
        <Route path="/admin/pdf/:lessonId/:pdfIndex"element={<AdminOnly><AdminPDFViewer /> </AdminOnly>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;