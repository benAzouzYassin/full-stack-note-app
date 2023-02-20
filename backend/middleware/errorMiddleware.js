const dotenv = require("dotenv").config()

// @des create goal
// @route POST /api/goals
// @access Private
const createGoalError = (err, req, res, next) => {

    res.statusCode = 500
    res.json({ code: res.statusCode, message: err.message, errStack: process.env.NODE_ENV == 'development' ? err.stack : null })

    next()
    //finish this function

}
module.exports = { createGoalError }