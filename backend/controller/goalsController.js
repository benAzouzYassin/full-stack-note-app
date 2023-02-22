const asyncHandler = require("express-async-handler")
const goalModel = require("../models/goalModel")

// @des get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find()
    res.status(200).json({ message: goals })
    res.end()
})

// @des create goal
// @route POST /api/goals
// @access Private
const createGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        throw new Error("there is no text with the request")

    } else {
        const newGoal = await req.body.text
        goalModel.create({ 'text': newGoal })
        res.status(200).send("created new goal")
        res.end()
    }
}
)
// @des update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    if (req.body.text) {
        await goalModel.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
        res.status(200).json("updated succesfully")
        res.end()
    } else {
        throw new Error("no goal provided")
    }


})

// @des delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
    await goalModel.deleteOne({ _id: req.params.id })
    res.status(200).json("deleted successfully")
    res.end()
})


module.exports = {
    getGoals, createGoal, updateGoal, deleteGoal
}