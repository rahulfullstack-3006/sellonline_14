const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
  console.log("req.headers",req.headers);
  try{
   const token=req.headers.authorization.split(" ")[1];
   console.log("token",token);
   const verify=jwt.verify(token,'secret_key');
   console.log("verify",verify);
   next()
  }
  catch(error){
    return res.status(401).send({
      message:'Invalid Token'
    })
  }
}