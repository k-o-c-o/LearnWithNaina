const Material = require("../models/Material");

const createMaterial = async (
  req,
  res
) => {
  try {
    const material =
      await Material.create(req.body);

    res.status(201).json(material);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMaterialsByLesson =
async (req, res) => {
  try {
    const materials =
      await Material.find({
        lessonId: req.params.lessonId
      });

    res.json(materials);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

const getMaterialById =
async (req, res) => {
  try {
    const material =
      await Material.findById(
        req.params.materialId
      );

    res.json(material);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  createMaterial,
  getMaterialsByLesson,
  getMaterialById
};