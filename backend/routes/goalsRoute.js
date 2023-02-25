const router = require("express").Router()
const { protectRoute } = require("../middleware/authMiddleware")

const { getGoals, createGoal, updateGoal, deleteGoal } = require("../controller/goalsController")
// /api/goals
router.route("/").get(protectRoute, getGoals).post(protectRoute, createGoal)

// /api/goals/:id
router.route("/:id").put(protectRoute, updateGoal).delete(protectRoute, deleteGoal)




module.exports = router