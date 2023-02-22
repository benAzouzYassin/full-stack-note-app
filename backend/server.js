const express = require("express")
const dotenv = require("dotenv").config()
const goalsRoute = require("./routes/goalsRoute")
const errorMiddleware = require('./middleware/errorMiddleware')
const colors = require("colors")
const db = require("./config/db").conn

const PORT = process.env.PORT || 8000
const app = express()



//request body parsing
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//main route
app.get("/", (req, res) => {
    res.send("tis is the landpage")

    res.end()
})

//routes middleWare
app.use("/api/goals", goalsRoute)



//custom error handling for creatingGoal
app.use(errorMiddleware.createGoalError)
app.listen(PORT, () => console.log("server started on : " + PORT))


