const jwt = require("jsonwebtoken")
const NoteModel = require("../../models/NoteModel")

// @route POST /api/user/register
function isValidRegister(req) {
    const { userName, email, password } = req.body
    if (userName && email && password) {
        return true
    }
    else {
        return false
    }
}

// @route POST /api/user/login
function isValidLoign(req) {
    const { email, password } = req.body
    if (email && password) {
        return true
    }
    else {
        return false
    }
}

//@route POST /api/notes

function isLogedIn(req) {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        const headers = { ...req.headers }
        const token = headers.authorization.split(" ")[1]
        if (jwt.decode(token)) {
            return true
        }
        else { return false }
    } else {
        return false
    }

}

//@route POST /api/notes

function noteText(req) {
    const { text } = req.body
    if (text) {
        return true
    }
    else {
        return false
    }
}

//@route  DELETE /api/notes
async function noteId(req) {
    if (req.body.noteId) {
        try {
            const note = await NoteModel.findById(req.body.noteId)
            return true
        } catch (err) {
            return false
        }
    }
    else {
        return false
    }
}

module.exports = { isValidRegister, isValidLoign, noteText, noteId, isLogedIn }