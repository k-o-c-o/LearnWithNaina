
const express =require("express");
//handles file uploads
const multer =require("multer");
const cloudinary =require("../config/cloudinary");
const fs =require("fs");
const router =express.Router();

const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const upload = multer({
    storage: storage
});

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
      console.log(req.file);
      const result =
        await cloudinary.uploader.upload(
            req.file.path,
            {
                resource_type: "raw",
                use_filename: true,
                unique_filename: true
            }
        );

      fs.unlinkSync(
        req.file.path
      );

      console.log(result);

        res.json({
            url: result.secure_url
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