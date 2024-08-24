require('dotenv').config()
const express = require('express')
const connectDatabase = require('./database')
const Blog = require('./model/blogModel')

const app = express()
app.use(express.json())
const {multer,storage} = require('./middleware/multerConfig')
const upload = multer({storage : storage})
const fs = require('fs')

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
    let filename;
    if(req.file){
        const filename = req.file.filename
    }

    if(!title || !subtitle || !description){
        return res.status(400).json({
            message : "Please provide title, subtitle, description"
        })
    }

    await Blog.create({
        title: title,
        subtitle: subtitle,
        description: description
        // image: filename
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
// API to get blog
app.get("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id) // findById() returns data in an object
    if(!blog){
        return res.status(404).json({
            message : "no data found"
        })
    }
    res.status(200).json({
        message: "Blog fetched successfully",
        data : blog
    })
})
// API to delete blog
app.delete("/blog/:id",async (req,res)=>{
    const id = req.params.id
    const blog = await Blog.findById(id)
    const imageName = blog.image
        fs.unlink(`./storage/${imageName}`, (err)=>{
            if(err){
                console.log(err)
            }
            else{
                console.log("File deleted successfully")
            }
        })


    await Blog.findByIdAndDelete(id) // FindByIdAndDelete() delete data of that id
    res.status(200).json({
        message : "Blog deleted successfully"
    })
})

// API to edit blog
app.patch('/blog/:id',upload.single('image'),async (req,res)=>{
    const id = req.params.id
    const {title,subtitle,description} = req.body
    let imageName;
    if(req.file){
        imageName = req.file.filename
        const blog = await Blog.findById(id)
        const oldImage = blog.image

        fs.unlink(`./storage/${oldImage}`,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("File deleted successfully")
            }
        })
    }

    await Blog.findByIdAndUpdate(id,{
        title : title,
        subtitle : subtitle,
        description : description,
        image : imageName
    })
    res.status(200).json({
        message : "Blog updated successfully"
    })
})


app.use(express.static('./storage'))

app.listen(process.env.PORT, () => {
    console.log("NodeJS project has started")
})
