const express=require('express');
const router=express.Router();
const{Author,validationCreateauthor,validationUpdateauthor}=require("../model/Author")


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
            res.status(500).json({message:"something went wrong 11"})  
        }
       
        
        })
        
  /**
 * @desc  get all authors by id
 * @route  api/authors/:id //= params
 * @method  GET
 * @access PUBLIC
 */
        router.get('/:id',async(req,res)=>{
            try {
            const author=await Author.findById(req.params.id) 
            if(author){ res.status(200).json(author) 
            }else{
                res.status(404).json({message:" this author is NOT found"})  
            }
            
            } 
            catch (error) {
                res.status(500).json({message:" something went wrong   "})  
                
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
          /**
           * @desc CREATE NEW AUTHOR
           */
          try{
            const author=new Author(
                {
                    firstName:req.body.firstName,
                    lastName:req.body.lastName,
                    nationality:req.body.nationality,
                    image:req.body.image
                   
                    })
                    const result=await author.save();
                    //const {_id ,...othor}=result._doc;
                    res.status(201).json(result);  // 201 created 
                     }
                     catch(error){
                        console.log(error)
                       res.status(500).json({message: "something went wrong"}); 
                        }
        
                 
        
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
            const author=await Author.findByIdAndUpdate(req.params.id,{
                $set:{
                firstName:req.body.firstName,
                lastName:req.body.lastName,
                image:req.body.image }
        },{new:true}
        
        )
         res.status(200).json(author)
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
        const author= await Author.findById(req.params.id)// first validit is it found in db or no 
    if(author){
        const author= await Author.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"author has been  deleted"}) 
    }else{
        res.status(400).json({message:"author is not found in db"})  
    }
    
        
    } catch (error) {
        console.log(error)
            res.status(500).json({message: "something went wrong"}); 
        
    }
    
    
    })

//



module.exports=router;
// module.exports={
//     router
// }