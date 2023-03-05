const express=require('express');
//const mongod = require("mongodb");
const app=express();
const path=require("path")
const bodybarser=require("body-parser");
const mongoose = require('mongoose');
const upload_img=require("./routes/uploadimg.js")
const bookspath=require("./routes/books.js");
const authorspath=require("./routes/authors");
const { logger } = require('./middleware/logger.js');
const { notFound, errorhandler }  = require('./middleware/error.js');
const authuser=require("./routes/auth.js")

const dotenv=require("dotenv").config()
//dotenv.config();

// connect db with mongodb

//mongoose.connect('mongodb://localhost/testaroo');
 //const dbc="mongodb://1027.0.0.1:27017/bookstore";// { useNewUrlParser: true }
 //mongoose.set('strictQuery', false);

 mongoose.set('strictQuery', true);
mongoose.connect(process.env.MANGO_URI)
.then(()=>console.log("Connected to MongoDB......."))
.catch(error=>console.log("Connection Failed to MongoDB.......",error))

//express.json() AND bodyborsar middalware or package  use to convert any body req to json
 app.use(express.json()) //OR   app.use(bodybarser.json())
 app.use(logger)

//middlware to show images
app.use('/upload',upload_img)

//middlware serve  static files (to show images)
app.use(express.static(path.join(__dirname,"images")))
//routes
app.use('/api/books',bookspath)// eq as router.get('api/books/',(req,res)
app.use('/api/authors',authorspath)
app.use('/api/auth',authuser)


/**
 * @ error middleware FOR Not found route
 */
app.use(notFound)    
/**
 * @ error middleware FOR Not found route
 */
app.use(errorhandler)


const port=process.env.PORT??5000; // in es6  ??== ||

app.listen(process.env.PORT??5000,()=>{
    console.log(`server is running in ${process.env.NODE_ENV}on port ${port}`)
})