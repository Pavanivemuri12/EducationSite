const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://pavanisri427:ammubunny12@cluster1.l06xy.mongodb.net/?retryWrites=true&w=majority&appName=cluster1")

const connection = mongoose.connection;

connection.on('connected', () => (console.log("DB Connected")))
connection.on('error', () => (console.log("DB Error")))

module.exports = mongoose

// const db = require('./config/db')