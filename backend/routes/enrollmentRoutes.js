const express = require("express");

const {
  enrollStudent,getStudentEnrollments,getStudentsByCourse,addGrade,
} = require(
  "../controllers/enrollmentController"
);

const router = express.Router();

router.post("/", enrollStudent);
router.get("/course/:courseId",getStudentsByCourse);
router.get("/:studentId",getStudentEnrollments);
router.post("/grade/:enrollmentId",addGrade);


module.exports = router;