const express = require("express");
const router = express.Router();

const {
    enrollStudent,
    getStudentEnrollments
} = require("../controllers/enrollmentController");

router.post("/", enrollStudent);

router.get("/:userId", getStudentEnrollments);

module.exports = router;