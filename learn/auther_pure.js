const express=require('express');
const router=express.Router();
const Joi = require('joi');
const{Author}=require("../model/Author")

const authors=[
    {
    id:1,
    firstName:'hesham',
    lastName:'abdulaziz',
    nationality:'canada',

    },
    {
        id:2,
        firstName:'ali',
        lastName:'abdulaziz',
        nationality:'canada',
    
        },
        {
            id:3,
            firstName:'saaid',
            lastName:'marhol',
            nationality:'canada',
        
            },
            {
                id:4,
                firstName:'ddsdsw',
                lastName:'altyar',
                nationality:'canada',
            
                },
    
    ]
    
/**
 * @desc  get all authors
 * @route  api/authors
 * @method  GET
 * @access PUBLIC
 */
    router.get('/',async(req,res)=>{
        try {
       //.sort({firstName:1}).select("firstName lastName -_id");
        const autherlist=await Author.find();
        res.status(200).json(autherlist)  
        } 
        catch (error) {
            res.status(500).json({message:"something went wrong"})  
        }
       
        
        })
        
  /**
 * @desc  get all authors by id
 * @route  api/authors/:id
 * @method  GET
 * @access PUBLIC
 */
        router.get('/:id',async(req,res)=>{
            try {
                
            const author=await Author.findById(req.params.id)// OR WE CAN USE  parseInt oR  + 
            if(author){ res.status(200).json(author) 
            }else{
                res.status(400).json({message:" this author is not found"})  
            }
            
            } 
            catch (error) {
                res.status(500).json({message:" something went wrong"})  
                
            }
            
            
            })

 /**
 * @desc  CREATE NEW  authors
 * @route  api/authors
 * @method  POST
 * @access PUBLIC
 */
        
    router.post('/',async(req,res)=>{
        // validation
               const schema = Joi.object({
                firstName:Joi.string().trim().min(3).max(200).required(),
                lastName:Joi.string().trim().min(3).max(200).required(),
                nationality:Joi.string().trim().min(3).max(100).required(),
                image:Joi.string()

                })
                //const valid_input=schema.validate(req.body);
                //  const error=valid_input.error;
                const{error}= schema .validate(req.body);
         
          if(error){
             return res.status(400).json({message:error.details[0].message})  //400 mean the problem from client mybe insert empty value
        
          }
          try{
            const author=new Author(
                {
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    nationality:req.body.nationality,
                    image:req.body.image
                   
                    })
                    const result=await author.save();
                    res.status(201).json(result);  // 201 created 
          }catch(error){
            console.log(error)
            res.status(500).json({message: "something went wrong"}); 
          }
        
        
                
                //  if(addauthor){
                //     authors.unshift(addauthor) ;
                //    res.status(201).json(authors);  // 201 created 
                //  }
                 
        
            })

             /**
            * @desc UPDATE   author
            * @route  api/authors/:ID
            * @method  PUT
            * @access PUBLIC
              */
            
        router.put('/:id',async(req,res)=>{

            const{error}= validationUpdateauthor(req.body);
            if(error){res.status(400).json({message:"author is not found"}) } //{message:"author was updated"}
          try {
            const upd_author=await Author.findByIdAndUpdate(req.params.id,{
                $set:{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                image:req.body.image }
        },{new:true}
        
        )
         res.status(200).json(upd_author)
          } 
          catch (error) {
            console.log(error)
            res.status(500).json({message: "something went wrong"}); 

            
          }
            })


      
  /**
 * @desc  DELETE  author by id
 * @route  api/authors/:id
 * @method  DELETE
 * @access PUBLIC
 */
  router.delete('/:id',async(req,res)=>{
    try {
        const author= await Author.findById(req.params.id)// OR WE CAN USE  parseInt oR  + 
    if(author){
        const author= await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"author is deleted"}) 
    }else{
        res.status(400).json({message:"author is not found in db"})  
    }
    
        
    } catch (error) {
        console.log(error)
            res.status(500).json({message: "something went wrong"}); 
        
    }
    
    
    })

            


  

  /**
   * @desc function  validate author before update
   */
  function  validationUpdateauthor(obj){

               const schema = Joi.object({
                firstName:Joi.string().trim().min(3).max(200),
                lastName:Joi.string().trim().min(3).max(200),
                nationality:Joi.string().trim().min(3).max(200),
                image:Joi.string()

            
                })
        return  schema .validate(obj);
  }



module.exports=router;
// module.exports={
//     router
// }