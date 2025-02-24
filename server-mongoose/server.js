const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
app.use(cors())
app.use(express.json())

const db = require('./config/db')
const courses = require('./routes/CourseRoute')

app.get('/', (req, res) => res.status(200).json({ message: "Welcome" }))
app.use('/courses', courses)


app.listen(port, (() => console.log(`Listening on ${port}`)))