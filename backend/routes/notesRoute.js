const router = require("express").Router()
const { getNotes, updateNote, createNote, deleteNote } = require("../controller/notesController")
const protectRoute = require("../middleware/authMiddleware").protectRoute

// @Route Get /api/notes/
// @Private
router.get("/", protectRoute, getNotes)

// @Route put /api/notes/:id
// @Private
router.put("/:id", protectRoute, updateNote)


// @Route Post /api/notes/
// @Private
router.post("/", protectRoute, createNote)

// @Route Post /api/notes/
// @Private
router.delete("/", protectRoute, deleteNote)

module.exports = router