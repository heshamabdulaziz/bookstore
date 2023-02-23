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
    router.get('/',(req,res)=>{
        res.status(200).json(authors)  
        
        })
        
  /**
 * @desc  get all authors by id
 * @route  api/authors/:id
 * @method  GET
 * @access PUBLIC
 */
        router.get('/:id',(req,res)=>{
            const author=authors.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
            if(author){ res.status(200).json(author) 
            }else{
                res.status(400).json({message:" this author is not found"})  
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
               
           const{error}= validationCreateauthor(req.body);
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
            
        router.put('/:id',(req,res)=>{

            const{error}= validationUpdateauthor(req.body);
            const author=authors.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
            if(author){ res.status(200).json(author) //{message:"author was updated"}
            }else{
                res.status(400).json({message:"author is not found"})  
            }
            
            
            })

/**
 * @desc  DELETE all authors in array
 * @route  api/authors/
 * @method  DELETE
 * @access PUBLIC
 */
router.delete('/',(req,res)=>{
   // books.delete;
    const author=authors.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
    if(authors){
        
        res.status(200).json(authors) 
    }else{
        res.status(400).json({message:"author is not found !!!!!"})  
    }
    
})

      
  /**
 * @desc  DELETE all author by id
 * @route  api/authors/:id
 * @method  DELETE
 * @access PUBLIC
 */
  router.delete('/:id',(req,res)=>{
    const author=authors.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
    if(author){
        authors.pop()
        res.status(200).json(authors) 
    }else{
        res.status(400).json({message:"authors is not found"})  
    }
    
    
    })

            


  function  validationCreateauthor(obj) 
  {   
        /**
       * @desc function  validate authors before add  new book
       */
               const schema = Joi.object({
                firstName:Joi.string().trim().min(3).max(200).required(),
                lastName:Joi.string().trim().min(3).max(200).required(),
                nationality:Joi.string().trim().min(3).max(100).required(),
                image:Joi.string()

                })
        return  schema .validate(obj);
  }

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