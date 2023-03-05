const mongoose = require('mongoose');
const Joi = require('joi');
/**
     * @desc   Schama authors
     */
const  BookSchama=new mongoose.Schema({
        title:{
        type:String,
        required:true,
        trim:true,
        minlength:3,
        maxlength:200
        },
        auther:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Author",
        required:true,
        },
        descraibtion:{
            type:String,
            required:true,
            trim:true,
            minlength:5
            },
            price:{
                type:Number,
                required:true,
                min:0
        
                },
         cover:{
          type:String,
           enum:["soft cover","hard cover"]
        },

},
{ timestamps:true}

)
const Book=mongoose.model('Book',BookSchama)
// end  Autherschama
function  validationCreatebook(obj) 
{   
      /**
     * @desc function  validate authors before add  new book
     */
            const schema = Joi.object({
            title:Joi.string().trim().min(3).max(200).required(),
            auther:Joi.string().required(),
            descraibtion:Joi.string().required().min(5),
            price:Joi.number().min(0).required(),
            cover:Joi.string().valid("soft cover","hard cover").required()

              })
      return  schema .validate(obj);
}

/**
 * @desc function  validate author before update
 */
function  validationUpdateBook(obj){

    const schema = Joi.object({
        title:Joi.string().trim().min(3).max(200),
        auther:Joi.string(),
        descraibtion:Joi.string().min(5),
        price:Joi.number().min(0),
        cover:Joi.string().valid()

          })
      return  schema .validate(obj);
}

module.exports={
    Book,
    validationCreatebook,
    validationUpdateBook
}