const express=require('express');
const router=express.Router();
const  asynchandlar=require('express-async-handler');
const bcrypt=require("bcryptjs")
const {User,validatRigisteruser,validationUpdateuser,validatLoginuser}=require("../model/User.js")

 /**
 * @desc  CREATE NEW  user
 * @route  api/user/register
 * @method  POST
 * @access PUBLIC
 */
      
   router.post('/register',asynchandlar(async(req,res)=>{
        // validation
               
         const{error}= validatRigisteruser(req.body);
         if(error){
             return res.status(400).json({message:error.details[0].message})  //400 mean the problem from client mybe insert empty value
      
         }
         let user=await User.findOne({email:req.body.email});//select("isAdmin");;
         if(user){
            return res.status(400).json({message:"this user already rigister in db"})  //400 mean the problem from client mybe insert empty value
      
         }
         /**
           * @desc CREATE NEW and do hashing  for password
           * 
           */

          const salt=await bcrypt.genSalt(10);
          req.body.password= await bcrypt.hash(req.body.password,salt)
            user=new User(
               {
                  email:req.body.email,
                  uesrName:req.body.uesrName,
                  password:req.body.password,
                  isAdmin:req.body.isAdmin
               
                  })
                  const result=await user.save();
                  const token=null;
                  const {password,...othor}=result._doc;
                    res.status(201).json({...othor,token});  // 201 created 
                  
               }
                  
      )  )

       /**
 * @desc  CREATE login  user
 * @route  api/auth/login
 * @method  POST
 * @access PUBLIC
 */
      
   router.post('/login',asynchandlar(async(req,res)=>{
      // validation
             
       const{error}=validatLoginuser(req.body);
       if(error){
           return res.status(400).json({message:error.details[0].message}) //   التحقق من البيانات المدخلة
    
       }
       let user=await User.findOne({email:req.body.email});
       if(!user){
          return res.status(400).json({message:"invalid email or password"})  
    
       }
      
       const ispasswordmatch=await bcrypt.compare(req.body.password,user.password)
       if(!ispasswordmatch){
         return res.status(400).json({message:"invalid email or password"})  
   
      }

                const token=null;
                const {password,...othor}=user._doc;
                  res.status(200).json({...othor,token});  
                
             }
                
    )  )





module.exports=router;
