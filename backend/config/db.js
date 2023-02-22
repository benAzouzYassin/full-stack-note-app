const mongoose = require("mongoose")
const colors = require("colors")

mongoose.set('strictQuery', true)

//connecting to the mongo db data base

const conn = mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'.blue))
    .catch(err => console.log(err));

module.exports = {
    conn
}