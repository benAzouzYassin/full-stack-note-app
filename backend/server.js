
require("dotenv").config()
require("./config/db").conn

const express = require("express")
const userRoute = require("./routes/usersRoute")
const notesRoute = require("./routes/notesRoute")
const cors = require("cors")
const { errorHandler } = require('./middleware/errorMiddleware')

const PORT = process.env.PORT || 8000
const app = express()
app.use(cors())


//request body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//main route
app.get("/", (req, res) => {
    res.send("the landpage")
    res.end()
})

//routes 
app.use("/api/user", userRoute)
app.use("/api/notes", notesRoute)

//custom error handling for creatingGoal
app.use(errorHandler)
app.listen(PORT, () => console.log("server started on : " + PORT))


