const express=require("express");
const router=express.Router();

const path=require("path");
const multer=require('multer')


const storageupload= multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.join(__dirname,"../images"))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const date=new Date().toISOString().replace(/:/g,"-")
      cb(null,uniqueSuffix+file.originalname)
      //notes add this code  [ replace(/:/g,"-") ] to work with os windows other sys no need
    }
  })
  
  // const upload = multer({ storage: storage })

  const upload=multer({storage:storageupload})

  router.post("/",upload.single("image"),(req,res)=>{
    res.status(200).json({"message":" image uploaded"})
  })

  module.exports=router;