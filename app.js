require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')

const app = express()

connectDatabase()

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to home page."
    })
})

app.get("/about", (req, res) => {
    res.json({
        message: "Welcome to about page."
    })
})

app.listen(process.env.PORT, () => {
    console.log("NodeJS project has started")
})
