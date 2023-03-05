const express=require('express');
const router=express.Router();
const  asynchandlar=require('express-async-handler');
const{Book, validationCreatebook, validationUpdateBook}=require("../model/Books")


/**
 * @desc  get all BOOKSs
 * @route  api/books
 * @method  GET
 * @access PUBLIC
 */
    router.get('/',async(req,res)=>{
        try {
             
            /**
         * desc populate(ralation collection[table],["docs "])  used to mk ralation btwn collections
         */
        const booklist=await Book.find().populate("auther",["_id","firstName","lastName"]);
        res.status(200).json(booklist)  
        } 
        catch (error) {
            res.status(500).json({message:"something went wrong"})  
        }
       
        
        })
        
  /**
 * @desc  get all book by id
 * @route  api/books/:id //= params
 * @method  GET
 * @access PUBLIC
 */
        router.get('/:id',asynchandlar(async(req,res)=>{
        
            const book=await Book.findById(req.params.id).populate("auther"); 
            if(book){ res.status(200).json(book) 
            }else{
                res.status(404).json({message:" this book is NOT found"})  
            }
            
            
            
            }))

 /**
 * @desc  CREATE NEW  book
 * @route  api/books
 * @method  POST
 * @access PUBLIC
 */
        
    router.post('/',async(req,res)=>{
        // validation
               
          const{error}= validationCreatebook(req.body);
          if(error){
             return res.status(400).json({message:error.details[0].message})  //400 mean the problem from client mybe insert empty value
        
        }
          /**
           * @desc CREATE NEW AUTHOR
           */
          try{
            const book=new Book(
                {
                    
                    title:req.body.title,
                    auther:req.body.auther,
                    descraibtion:req.body.descraibtion,
                    price:req.body.price,
                    cover:req.body.cover
                
                    })
                    const result=await book.save();
                    //const {_id ,...othor}=result._doc;
                    res.status(201).json(result);  // 201 created 
                     }
                     catch(error){
                        console.log(error)
                       res.status(500).json({message: "something went wrong"}); 
                        }
        
                 
        
            })

             /**
            * @desc UPDATE   book
            * @route  api/book/:ID
            * @method  PUT
            * @access PUBLIC
              */
            
        router.put('/:id',async(req,res)=>{

            const{error}= validationUpdateBook(req.body);
            if(error){res.status(400).json({message:"book is not found"}) } 
          try {
            const updatedbook=await Book.findByIdAndUpdate(req.params.id,{
                $set:{
                    title:req.body.title,
                    auther:req.body.auther,
                    descraibtion:req.body.descraibtion,
                    price:req.body.price,
                    cover:req.body.cover
                }
        },{new:true}
        
        )
         res.status(200).json(updatedbook)
          } 
          catch (error) {
            console.log(error)
            res.status(500).json({message: "something went wrong"}); 

            
          }
            })


      
  /**
 * @desc  DELETE  book by id
 * @route  api/books/:id
 * @method  DELETE
 * @access PUBLIC
 */
  router.delete('/:id',async(req,res)=>{
    try {
        const delBook= await Book.findById(req.params.id)
    if(delBook){
        const delBook= await Book.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"book has been  deleted"}) 
    }else{
        res.status(400).json({message:"book is not found in db"})  
    }
    
        
    } catch (error) {
        console.log(error)
            res.status(500).json({message: "something went wrong"}); 
        
    }
    
    
    })

//


module.exports=router;
