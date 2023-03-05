
// first custom middleware
const logger=(req,res,next)=>{
    //  هذا استفيد منه انه كلما يجيني طلب من الكلاينت استطيع اعرف نوع الطلب من خلال الكونسل
 console.log(`${req.method}  ${req.protocol}:// ${req.get('host')}${req.originalUrl}`)
 next()
  }
module.exports={logger}