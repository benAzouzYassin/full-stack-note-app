const mongoose = require("mongoose")
const User = require("./UserModel")
const schema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "pls reference to a user"]
    },
    text: {
        type: String,
        required: [true, "text is required"]
    }

}, { timestamps: true })

module.exports = mongoose.model("goalSchema", schema)