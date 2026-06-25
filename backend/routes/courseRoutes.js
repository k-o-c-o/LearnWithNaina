const express = require("express");

const {createCourse, getCourses,getCourseById,} = require("../controllers/courseController");

const router = express.Router();

router.post("/", createCourse);

router.get("/", getCourses);
router.get("/:courseId", getCourseById);

module.exports = router;