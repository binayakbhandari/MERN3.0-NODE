require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')

const app = express()
app.use(express.json())

connectDatabase()

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to home page."
    })
})

app.post("/blog", (req, res)=>{
    console.log(req.body)
    res.status(200).json({
        message : "Blog API hit sucessfully"
    })
})

app.listen(process.env.PORT, () => {
    console.log("NodeJS project has started")
})
