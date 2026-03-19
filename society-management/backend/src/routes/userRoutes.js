
const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const { getUsers } = require("../controllers/userController")
const authMiddleware = require("../middleware/authMiddleware")
const roleMiddleware = require("../middleware/roleMiddleware")
const {getMe} = require("../controllers/userController")    

router.get(
 "/",
 authMiddleware,
 roleMiddleware(["ADMIN"]),
 userController.getUsers
)

router.delete(
 "/:id",
 authMiddleware,
 roleMiddleware(["ADMIN"]),
 userController.deleteUser
)

router.put(
 "/:id/role",
 authMiddleware,
 roleMiddleware(["ADMIN"]),
 userController.changeUserRole
)


router.get("/me", authMiddleware, getMe)

module.exports = router
module.exports = router