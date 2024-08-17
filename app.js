const express = require('express')
const app = express()

app.get("/", (req,res)=>{
    console.log(req)
        res.json({
            message : "Welcome to home page."
        })
})

app.get("/about", (req,res)=>{
    console.log(req)
        res.json({
            message : "Welcome to about page."
        })
})

app.listen(3000, ()=>{
    console.log("NodeJS project has started")
})
