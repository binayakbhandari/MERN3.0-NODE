const mongoose = require('mongoose')

async function connectDatabase(){
    await mongoose.connect('mongodb+srv://binayakbhandari60:helloworldnode@cluster0.smtquzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    console.log("Database connected successfully")
}

module.exports = connectDatabase