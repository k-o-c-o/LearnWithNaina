const Lesson = require("../models/Lesson");
const cloudinary = require("../config/cloudinary");

const createLesson = async (req, res) => {
  try {
    const lesson = await Lesson.create({
      title: req.body.title,
      courseId: req.body.courseId,
    });

    res.status(201).json(lesson);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getLessonsByCourse =
async (req, res) => {
  try {
    const lessons =
      await Lesson.find({
        courseId: req.params.courseId
      });

    res.json(lessons);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const uploadPDF = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    lesson.pdfs.push({
      title: req.body.title,
      url: req.body.url,
    });

    await lesson.save();

    res.json(lesson);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.lessonId);

    if (!lesson) {
      return res.status(404).json({
        message: "Lesson not found",
      });
    }

    res.json(lesson);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  uploadPDF,
};