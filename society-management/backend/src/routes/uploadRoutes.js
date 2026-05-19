import express from "express";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post(
  "/",
  upload.single("file"),
  (req, res) => {

    console.log(req.file);

    res.status(200).json({
      message: "File uploaded successfully",
      fileUrl: `/uploads/${req.file.filename}`,
    });
  }
);

export default router;