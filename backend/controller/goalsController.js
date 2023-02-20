
// @des get goals
// @route GET /api/goals
// @access Private
function getGoals(req, res) {
    res.status(200).json({ message: "should get goals  ^^" })
    res.end()
}

// @des create goal
// @route POST /api/goals
// @access Private
function createGoal(req, res) {
    if (!req.body.text) {
        throw new Error("there is no text with the request")


    } else {
        res.status(200).send("should create a new goal")
        res.end()
    }
}

// @des update goal
// @route PUT /api/goals/:id
// @access Private
function updateGoal(req, res) {
    res.status(200).json({ message: `should update the goal with id ${req.params.id}` })
    res.end()
}

// @des delete goal
// @route DELETE /api/goals/:id
// @access Private
function deleteGoal(req, res) {
    res.status(200).json({ message: `should delete with id ${req.params.id}` })
    res.end()
}


module.exports = {
    getGoals, createGoal, updateGoal, deleteGoal
}