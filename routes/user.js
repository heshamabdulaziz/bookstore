const express=require('express');
const router=express.Router();
const  asynchandlar=require('express-async-handler');
const{Author,validationCreateauthor,validationUpdateauthor}=require("../model/Author")
const {User,validatCreateuser,validationUpdateuser,validatLoginuser}=require("../model/User.js")



/**
 * @desc  get  user
 * @route  api/authors
 * @method  GET
 * @access PUBLIC
 */
    router.get('/',asynchandlar(async(req,res)=>{
        const userlist=await Author.find();
        res.status(200).json(userlist)  
      
            }  ))
        
  /**
 * @desc  get all authors by id
 * @route  api/authors/:id //= params
 * @method  GET
 * @access PUBLIC
 */
        router.get('/:id',async(req,res)=>{
            try {
            const user=await User.findById(req.params.id) 
            if(au){ res.status(200).json(author) 
            }else{
                res.status(404).json({message:" this author is NOT found"})  
            }
            
            } 
            catch (error) {
                res.status(500).json({message:" something went wrong   "})  
                
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