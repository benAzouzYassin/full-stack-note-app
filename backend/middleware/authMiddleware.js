const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const UserModel = require("../models/UserModel")
require("dotenv").config()


const protectRoute = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1]
            const payload = jwt.verify(token, process.env.JWT_SECRET)
            const user = await UserModel.findById(payload.id).select("-password")
            req.user = { "email": user.email, "id": user._id, "name": user.name }

        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error("not authorized")

        }
    } else {
        res.status(401)
        throw new Error("no authorization headers ")
    }
    next()
})
module.exports = { protectRoute }