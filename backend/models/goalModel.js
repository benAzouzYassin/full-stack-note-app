const mongoose = require("mongoose")

const schema = mongoose.Schema({
    text: {
        type: String,
        required: [true, "text value is required"]
    }

}, { timestamps: true })

module.exports = mongoose.model("goalSchema", schema)