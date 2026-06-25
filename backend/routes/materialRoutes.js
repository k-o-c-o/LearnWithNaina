const express = require("express");

const {
  createMaterial,
  getMaterialsByLesson,
  getMaterialById
} = require(
  "../controllers/materialController"
);

const router = express.Router();

router.post("/", createMaterial);

router.get("/lesson/:lessonId", getMaterialsByLesson);
router.get("/:materialId", getMaterialById);

module.exports = router;