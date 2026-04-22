
import express from "express"
import { createNotice, getNotices ,deleteNotice} from "../controllers/noticeController.js"

const router = express.Router()

router.post("/", createNotice)
router.get("/", getNotices)
router.delete("/:id", deleteNotice)
export default router