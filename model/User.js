const mongoose = require('mongoose');
const Joi = require('joi');
const { boolean } = require('joi');
/**
     * @desc   Schama USERS
     */
const  UserSchama=new mongoose.Schema({
        email:{type:String,required:true,trim:true, minlength:5,maxlength:100,unique:true},
        uesrName:{type:String,required:true,trim:true, minlength:2,maxlength:200},
        password:{type:String,required:true,trim:true, minlength:6},
        isAdmin:{type:Boolean,default:false},
            },
            { timestamps:true}

    ) // end UserSchama raw
const User=mongoose.model('User', UserSchama)
// end  UserSchama
//validate   validate REGISTER USER  
function  validatRigisteruser(obj) 
{   
    /**
     * @desc function  validate REGISTER USER before add  new collection
     */
                const schema = Joi.object({
                email:Joi.string().trim().min(5).max(100).required().email(),
                uesrName:Joi.string().trim().min(2).max(200).required(),
                password:Joi.string().trim().min(6).required(),
                isAdmin:Joi.bool()

                })
        return  schema .validate(obj);
        }

//validate   validate Login REGISTER USER  
function  validatLoginuser(obj) 
{   
    /**
     * @desc function  validate REGISTER USER before add  new collection
     */
                const schema = Joi.object({
                email:Joi.string().trim().min(5).max(100).required().email(),
                password:Joi.string().trim().min(6).required(),
                })
            return  schema .validate(obj);
            }
/**
 * @desc function  validate author before update
 */
function  validationUpdateuser(obj){

             const schema = Joi.object({
                email:Joi.string().trim().min(5).max(100).email(),
                uesrName:Joi.string().trim().min(2).max(200),
                password:Joi.string().trim().min(6),
                isAdmin:Joi.bool()

          
              })
      return  schema .validate(obj);
}

module.exports={
    User,
    validatRigisteruser,
    validatLoginuser,
    validationUpdateuser
    
}