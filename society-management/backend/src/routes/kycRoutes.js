// import express from "express";
// import multer from "multer";
// import { uploadKYC } from "../controllers/kycController.js";

// const router = express.Router();

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/kyc");
//   },

//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// router.post(
//   "/upload",
//   upload.single("citizenship"),
//   uploadKYC
// );

// export default router;
import express from "express";
import multer from "multer";
import {
  uploadKYC,
  getKYC,
} from "../controllers/kycController.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/kyc");
  },

  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

router.post(
  "/upload",
  upload.single("citizenship"),
  uploadKYC
);

router.get("/:userId", getKYC);

export default router;