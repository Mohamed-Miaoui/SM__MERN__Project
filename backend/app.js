var express = require('express');
var cookieParser = require('cookie-parser');
var app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer")
const path = require("path")
const cors = require("cors")


//routes
var authRouter = require('./routes/auth');
var userRouter = require('./routes/user');
var postRouter = require('./routes/post');


app.use(express.json());
app.use(cors())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//routes
app.use('/auth', authRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);



//Image Storage config (local)
const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
      //unique name file
      return cb(null,`${file.fieldname}_${Date.now()}_${path.extname(file.originalname)}`)
    }
  }) 
  const upload = multer({storage:storage})
  
  //Creating Upload Endpoint For Images
  app.use('/images',express.static('upload/images'))
  //http://localhost:8000/upload 
  //product is the field name
  app.post("/upload",upload.single('user'),(req,res)=>{
    res.json({
      success : 1,
      image_url : `http://localhost:8000/images/${req.file.filename}` //we can acces the img threw this url
    })
  })
  

module.exports = app;
