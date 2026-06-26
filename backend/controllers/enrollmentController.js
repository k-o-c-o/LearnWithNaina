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

const getStudentEnrollments = async (req, res) => {
  try {

    const allEnrollments = await Enrollment.find();
    const enrollments = await Enrollment.find({
      studentId: req.params.studentId,
    }).populate("courseId");

    res.json(enrollments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



module.exports = {
  enrollStudent,
  getStudentEnrollments,
};