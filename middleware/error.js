const notFound=(req,res,next)=>{
    const error=new Error(`NOT FOUND ${req.originalUrl}`);
    res.status(404);
       next(error)
    }

    const errorhandler=(err,req,res,next)=>{
        const statusCode=res.statusCode===200 ? 500 : res.statusCode;
            res.status(statusCode).json({message:err.message})
        }

        module.exports={notFound,errorhandler}