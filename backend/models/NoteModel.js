const mongoose = require("mongoose")

const NoteSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "pls refference to a user"]
    },
    text: {
        type: String,
        required: [true, "note can't be empty "]
    }

})
module.exports = mongoose.model("Note", NoteSchema)