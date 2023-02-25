const asyncHandler = require("express-async-handler")
const goalModel = require("../models/goalModel")
const UserModel = require("../models/UserModel")
// @des get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await goalModel.find({ user: req.user.id })
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

        const goal = await goalModel.create({ user: req.user.id, 'text': newGoal })

        res.status(200).send("created new goal for " + req.user.id)
        res.end()
    }
}
)
// @des update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
    if (req.body.text) {

        const goal = await goalModel.findOne({ _id: req.params.id })

        if (!goal) { throw new Error("goal does not exist") }

        if (req.user.id.toString() === goal.user._id.toString()) {
            await goalModel.findByIdAndUpdate(req.params.id, { text: req.body.text }, { new: true })
            res.status(200).json("updated succesfully")
            res.end()
        }
        else {
            res.status(401)
            throw new Error("trying to update other user goal")
        }
    } else {
        throw new Error("no goal text provided")
    }


})

// @des delete goal
// @route DELETE /api/goals/:id
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {

    const goal = await goalModel.findOne({ _id: req.params.id })
    if (!goal) { throw new Error("goal does not exist") }
    if (req.user.id.toString() === goal.user._id.toString()) {
        await goalModel.deleteOne({ _id: req.params.id })
        res.status(200).json("deleted successfully")
        res.end()
    } else {
        res.status(401)
        throw new Error("trying to delete other user goal")
    }


})


module.exports = {
    getGoals, createGoal, updateGoal, deleteGoal
}