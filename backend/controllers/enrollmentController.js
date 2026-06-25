const Enrollment = require("../models/Enrollment");

const enrollStudent = async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    const existingEnrollment =
      await Enrollment.findOne({
        studentId,
        courseId
      });

    if (existingEnrollment) {
      return res.status(400).json({
        message: "Already enrolled"
      });
    }

    const enrollment =
      await Enrollment.create({
        studentId,
        courseId
      });

    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getStudentEnrollments = async (
  req,
  res
) => {
  try {
    const enrollments =
      await Enrollment.find({
        studentId: req.params.studentId
      }).populate("courseId");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getStudentsByCourse = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      courseId: req.params.courseId,
    }).populate("studentId", "name email");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const addGrade = async (req, res) => {
  try {
    const { testName, dateConducted, gradeReceived } = req.body;

    const enrollment = await Enrollment.findById(
      req.params.enrollmentId
    );

    enrollment.grades.push({
      testName,
      dateConducted,
      gradeReceived,
    });

    await enrollment.save();

    res.json(enrollment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  enrollStudent,
  getStudentEnrollments,
  getStudentsByCourse,
  addGrade,
};