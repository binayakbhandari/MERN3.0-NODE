require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')
const Blog = require('./model/blogModel')

const app = express()
app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})
connectDatabase()

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Welcome to home page."
    })
})

app.post("/blog",upload.single('image'), async (req, res)=>{
    // console.log(req.body)
    // const title = req.body.title
    // const subtitle = req.body.subtitle
    // const description = req.body.description
    // const image = req.body.image
    // We can do same thing in this way which is called object destructuring
    const {title, subtitle, description, image} = req.body
    // if(!title || !subtitle || !description || !image){
    //     return res.status(400).json({
    //         message : "Please provide title, subtitle, description or image"
    //     })
    // }

    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: description,
        image: image
    })

    console.log(title)
    res.status(200).json({
        message: "Blog API hit sucessfully"
    })
})

app.listen(process.env.PORT, () => {
    console.log("NodeJS project has started")
})
