const router = require("express").Router()
const { getNotes, updateNote, createNote, deleteNote, deleteAllNotes } = require("../controller/notesController")
const protectRoute = require("../middleware/authMiddleware").protectRoute

// @Route Get /api/notes/
// @Private
router.get("/", protectRoute, getNotes)

// @Route put /api/notes/:id
// @Private
router.put("/:id", protectRoute, updateNote)


// @Route Post /api/notes/
// @Private
router.post("/", (req, res, next) => {
    console.log(req.headers)
    next()

}, createNote)

// @Route Post /api/notes/
// @Private
router.delete("/", protectRoute, deleteNote)

// @Route Delete /api/notes/all
// @Private
router.delete("/all", protectRoute, deleteAllNotes)
module.exports = router