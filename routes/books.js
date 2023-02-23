const express=require('express');
const router=express.Router();
const Joi = require('joi');

const books=[
    {
    id:1,
    title:'c++',
    author:'jhon',
    description:'explain C++',
    price:10,
    cover:'soft cover'
    },
    {
        id:2,
        title:'php',
        author:'dannial',
        description:'explain PHP',
        price:15,
        cover:'soft cover'
        },
        {
            id:3,
            title:'node js',
            author:'braian',
            description:'explain NODE JS',
            price:50,
            cover:'hard cover'
            },
    
    ]
    
/**
 * @desc  get all books
 * @route  api/books
 * @method  GET
 * @access PUBLIC
 */
    router.get('/',(req,res)=>{
        res.status(200).json(books)  
        
        })
        
  /**
 * @desc  get all book by id
 * @route  api/books/:id
 * @method  GET
 * @access PUBLIC
 */
        router.get('/:id',(req,res)=>{
            const book=books.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
            if(book){ res.status(200).json(book) 
            }else{
                res.status(400).json({message:"book is not found"})  
            }
            
            
            })

 /**
 * @desc  CREATE NEW  book
 * @route  api/books
 * @method  POST
 * @access PUBLIC
 */
        
    router.post('/',(req,res)=>{
        // validation
               
           const{error}= validationCreateBook(req.body);
          if(error){
             return res.status(400).json({message:error.details[0].message})  //400 mean the problem from client mybe insert empty value
        
          }
        
        const addBook=
                {
                    id:books.length+2,
                    title:req.body.title,
                    author:req.body.author,
                    description:req.body.description,
                    price:req.body.price,
                    cover:req.body.cover
                    }
                 if(addBook){
                   books.unshift(addBook) ;
                   res.status(201).json(books);  // 201 created 
                 }
                 
        
            })

             /**
            * @desc UPDATE   book
            * @route  api/books/:ID
            * @method  PUT
            * @access PUBLIC
              */
            
        router.put('/:id',(req,res)=>{

            const{error}= validationUpdateBook(req.body);
            const book=books.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
            if(book){ res.status(200).json({message:"book was updated"}) 
            }else{
                res.status(400).json({message:"book is not found"})  
            }
            
            
            })

/**
 * @desc  DELETE all books in array
 * @route  api/books/
 * @method  DELETE
 * @access PUBLIC
 */
router.delete('/',(req,res)=>{
   // books.delete;
    const book=books.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
    if(books){
        
        res.status(200).json(books) 
    }else{
        res.status(400).json({message:"book is not found !!!!!"})  
    }
    
})

      
  /**
 * @desc  DELETE all book by id
 * @route  api/books/:id
 * @method  DELETE
 * @access PUBLIC
 */
  router.delete('/:id',(req,res)=>{
    const book=books.find(b=>b.id===Number(req.params.id) )// OR WE CAN USE  parseInt oR  + 
    if(book){
        books.pop()
        res.status(200).json(books) 
    }else{
        res.status(400).json({message:"book is not found"})  
    }
    
    
    })

            


  function  validationCreateBook(obj)
  {

/*  Spaghetti Code
                  
                if(!req.body.title || req.body.title.length<3 )
                { res.status(401).json("title is required and must be more then 3 character")}
                if(!req.body.description || req.body.description.length<3 )
                { res.status(401).json("description  is required and must be more then 3 character")} 
                ......
               
        /**
       * @desc function  validate Book before add  new book
       */
                 
               const schema = Joi.object({
                title:Joi.string().trim().min(3).max(200).required(),
                description:Joi.string().trim().min(3).max(500).required(),
                author:Joi.string().trim().min(3).max(200).required(),
                price:Joi.number().min(0).required(),
                cover:Joi.string().required(),
            
                })
        return  schema .validate(obj);
  }

  /**
   * @desc function  validate Book before update
   */
  function  validationUpdateBook(obj){

            
               const schema = Joi.object({
                title:Joi.string().trim().min(3).max(200),
                description:Joi.string().trim().min(3).max(500),
                author:Joi.string().trim().min(3).max(200),
                price:Joi.number().min(0),
                cover:Joi.string(),
            
                })
        return  schema .validate(obj);
  }



module.exports=router;
// module.exports={
//     router
// }