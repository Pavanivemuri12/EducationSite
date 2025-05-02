const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

const db = require('./config/db')
const courses = require('./routes/CourseRoute')
const notesRoutes = require("./routes/NotesRoute")

app.get('/', (req, res) => res.status(200).json({ message: "Welcome" }))
app.use('/courses', courses)
app.use("/notes", notesRoutes)


app.listen(port, (() => console.log(`Listening on ${port}`)))