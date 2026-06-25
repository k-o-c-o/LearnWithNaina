const express = require("express");

const {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  uploadPDF,
} = require("../controllers/lessonController");

const router = express.Router();

router.post("/", createLesson);
router.get("/lesson/:lessonId", getLessonById);
router.get("/:courseId", getLessonsByCourse);
router.post("/:lessonId/upload", uploadPDF);

module.exports = router;