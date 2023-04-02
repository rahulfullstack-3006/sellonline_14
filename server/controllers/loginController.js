const loginControlModel=require('../models/loginModel');

module.exports.loginController= async function(req,resp){
  try{
    let data=await loginControlModel.loginModel(req);
    resp.send(data);
    // resp.status(200).send({
    //   message:'Successfully Login',
    //   result:data
    // })
  }
  catch(error){
    console.log("loginControllerError",error);
    resp.send(error)
  }

}


module.exports.registerController=async function(req,resp){
  try{
   let result=await loginControlModel.registerModel(req,resp);
  //  resp.send(result);
  console.log("inside registerController",result);
  resp.send(result)
  }catch(error){
    resp.send(error)
  }
}
