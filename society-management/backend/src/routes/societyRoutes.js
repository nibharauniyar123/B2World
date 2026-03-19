const express = require("express")

const router = express.Router()

const societyController = require("../controllers/societyController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const { joinSociety } = require("../controllers/societyController")

router.post("/", authMiddleware, roleMiddleware(["admin"]), societyController.createSociety)

router.get("/", authMiddleware, roleMiddleware(["admin"]), societyController.getSocieties)

router.put("/:id", authMiddleware, roleMiddleware(["admin"]), societyController.updateSociety)

router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), societyController.deleteSociety)

router.get("/:id/users", authMiddleware, roleMiddleware(["admin"]), societyController.getSocietyUsers)

router.post("/join/:id", authMiddleware, joinSociety)

module.exports = router