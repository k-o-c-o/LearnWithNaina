
const express =require("express");
//handles file uploads
const multer =require("multer");
const cloudinary =require("../config/cloudinary");
const fs =require("fs");
const router =express.Router();
const upload =multer({  dest: "uploads/" });

router.post(
  "/pdf",
  upload.single("file"),
  async (req, res) => {
    try {

      if (!req.file) {
        return res.status(400).json({
            message: "No file uploaded"
        });
        }
      const result =
        await cloudinary.uploader.upload(
          req.file.path,
          {
            resource_type:
              "raw"
          }
        );

      fs.unlinkSync(
        req.file.path
      );

      res.json({
        url:
          result.secure_url
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message
      });
    }
  }
);

router.post(
  "/image",
  upload.single("file"),
  async (req, res) => {
    try {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          resource_type: "image"
        }
      );

      fs.unlinkSync(req.file.path);

      res.json({
        url: result.secure_url
      });

    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  }
);

module.exports =
router;