const express=require('express');
const app=express();
const path=require("path")
const bodybarser=require("body-parser");
const mongoose = require('mongoose');
const upload_img=require("./routes/uploadimg.js")
const bookspath=require("./routes/books.js");
const authorspath=require("./routes/authors");
const { string, number, required } = require('joi');


 // connect db with mongodb
 const dbc="mongodb+srv://hesham:alsofi2050@cluster0.d8tnilc.mongodb.net/?retryWrites=true&w=majority";
 mongoose.set('strictQuery', false);
mongoose.connect(dbc)
.then(()=>console.log("Connected to MongoDB......."))
.catch(error=>console.log("Connection Failed to MongoDB.......",error))


//express.json() AND bodyborsar middalware or package  use to convert any body req to json
 app.use(express.json()) //OR   app.use(bodybarser.json())

//middlware to show images
app.use('/upload',upload_img)
//middlware serve  static files (to show images)
app.use(express.static(path.join(__dirname,"images")))
// return all book
//middlware to show  books
app.use('/api/books',bookspath)// eq as router.get('api/books/',(req,res)

//middlware to show  aouthers from route folder
app.use('/api/authors',authorspath)// eq as router.get('api/author/',(req,res)



app.use((req,res)=>{
    res.status(400).json({"msg":"this page is not found in servr"})

})


const port=5000;

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})