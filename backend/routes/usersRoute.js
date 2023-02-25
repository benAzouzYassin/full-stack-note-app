const router = require("express").Router()
const { protectRoute } = require("../middleware/authMiddleware")
const { registerUser, loginUser, gettingUser } = require("../controller/userController")

router.post("/register", registerUser)


router.post("/login", loginUser)


router.get("/me", protectRoute, gettingUser)

module.exports = router