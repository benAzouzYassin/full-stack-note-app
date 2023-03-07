const asyncHandler = require("express-async-handler")
const NoteModel = require("../models/NoteModel")
const validate = require("./utilities/validate")
const getUserId = require("./utilities/getUserId")
require("dotenv").config()
//  GET /api/notes/
//  Private
const getNotes = asyncHandler(async (req, res) => {
    try {
        const userId = getUserId(req)
        const notes = await NoteModel.find({ 'user': userId })
        res.send(notes)
    } catch (error) {

        throw new Error("unable to get notes.")

    }
    res.end()
})

// PUT /api/notes/:id
// Private
const updateNote = asyncHandler(async (req, res) => {
    if (req.body.text) {
        try {
            const note = await NoteModel.findById(req.params.id)
            const updated = await NoteModel.updateOne({ '_id': req.params.id, "user": getUserId(req) }, { text: req.body.text })
            res.json({ message: "updated with sucess" })
        } catch (error) {
            throw new Error("invalid note id or unautherized")
        }
    } else {
        throw new Error("no text was provided")
    }


    res.end()
})

// POST /api/notes
// Private
const createNote = asyncHandler(async (req, res) => {
    if (validate.noteText(req)) {
        const userId = getUserId(req)
        const note = await NoteModel.create({ "user": userId, "text": req.body.text })
        res.status(201).send(note)
    } else {
        throw new Error("note text was not provided")
    }

    res.end()
})

// DELETE /api/notes
// Private 
const deleteNote = asyncHandler(async (req, res) => {
    if (await validate.noteId(req)) {
        const deleted = await NoteModel.deleteOne({ "_id": req.body.noteId })
        res.json({ message: "deleted successfully" })
    } else {
        throw new Error("invalid note id")
    }
    res.end()
})

const deleteAllNotes = asyncHandler(async (req, res) => {
    const deleted = await NoteModel.deleteMany({ "user": getUserId(req) })
    res.end()
})

module.exports = { getNotes, updateNote, createNote, deleteNote, deleteAllNotes }