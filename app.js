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
    // We can do same thing in this way which is called object destructuring
    const {title, subtitle, description} = req.body
    // console.log(req.body)
    // console.log(req.file)
    const filename = req.file.filename

    if(!title || !subtitle || !description){
        return res.status(400).json({
            message : "Please provide title, subtitle, description or image"
        })
    }

    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: description,
        image: filename
    })

    res.status(200).json({
        message: "Blog API hit sucessfully"
    })
})

app.get("/blog", async (req,res)=>{
    const blogs = await Blog.find() // find() returns data in an aray
    res.status(200).json({
        message : "Blog data fetched successfully",
        data : blogs
    })
})


app.use(express.static('./storage'))

app.listen(process.env.PORT, () => {
    console.log("NodeJS project has started")
})
