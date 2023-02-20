const router = require("express").Router()


const { getGoals, createGoal, updateGoal, deleteGoal } = require("../controller/goalsController")
// /api/goals
router.route("/").get(getGoals).post(createGoal)

// /api/goals/:id
router.route("/:id").put(updateGoal).delete(deleteGoal)




module.exports = router