const asyncHandler = require("express-async-handler")
const UserModel = require("../models/UserModel")
const { isValidRegister, isValidLoign } = require("./utilities/validate")
const generateJWT = require("./utilities/generateJWT")
const bcrypt = require("bcryptjs")


// @des register new user
// @route POST /api/user/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    if (isValidRegister(req)) {
        const { email, password, userName } = req.body
        const user = await UserModel.find({ "email": email })
        if (user.length) {
            throw new Error("user exists")
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashedPass = await bcrypt.hash(password, salt)
            const newUser = await UserModel.create({ "name": userName, "email": email, "password": hashedPass })
            res.status(201).json({
                "name": userName,
                "email": newUser.email,
                'userToken': generateJWT(newUser._id),
            })
        }
        res.end()
    }
    else {
        throw new Error("user infos are not provided")
    }
})

// @des loging user
// @route POST /api/user/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
    if (isValidLoign(req)) {
        const [user] = await UserModel.find({ "email": req.body.email })
        if (await bcrypt.compare(req.body.password, user.password)) {
            res.json({ "name": user.name, "email": user.email, "token": generateJWT(user._id) })
        } else {
            res.send("bad")
        }
    } else {
        throw new Error("user info were not provided")
    }


    res.end()
})

// @des showing user informations
// @route get /api/user/register
// @access Private
const gettingUser = asyncHandler(async (req, res) => {
    res.send(req.user)
    res.end()
})


module.exports = { registerUser, loginUser, gettingUser }