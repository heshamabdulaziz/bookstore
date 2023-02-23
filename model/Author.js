const mongoose = require('mongoose');
const  Autherschama=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200
       },
       lastName:{
         type:String,
        required:true, 
        trim:true,
        minlength:3,
        maxlength:200
       },
       nationality:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:100
       },
       image:{
        type:String,
     default:"default-avater.png"
      
       },

       

},
{ timestamps:true}

)
const Author=mongoose.model('Auther',Autherschama)

module.exports={
    Author
}