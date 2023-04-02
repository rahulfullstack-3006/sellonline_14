const ldapRegisterController=require('../models/ldapRegisterModel')

module.exports.ldapRegister=async function(req,resp){

  try{
  let data=await ldapRegisterController.ldapRegisterModel(req);
  console.log("dataforldap",data);
  resp.send(data)
  }
  catch(error){
    console.log("ldapRegisterController",error);
    resp.send(error) 
  }
}

module.exports.ldapLogin=async function(req,resp){

  try{
  let data=await ldapRegisterController.ldapLoginModel(req);
  console.log("logindataforldap",data);
  resp.send(data)
  }
  catch(error){
    console.log("ldapLoginController",error);
    resp.send(error) 
  }
}

module.exports.updateLDAP=async function(req,resp){
  try{
    let data=await ldapRegisterController.updateModel(req);
    console.log("data for updateLdap",data);
    resp.send(data)
  }
  catch(error){
    resp.send(error)
  }
}

module.exports.deleteLDAP=async function(req,resp){
try{
let data=await ldapRegisterController.deleteModel(req);
console.log("datafordelete",data);
}
catch(error){
console.log("error",error);
}
}


/**************register api using mongodb start*********************/
module.exports.registerusingMongoControll=async function(req,resp){

  try{
  let data=await ldapRegisterController.registerusingMongo(req);
  console.log("dataforldap",data);
  resp.json({status:200,message:'Successfully Register',data});
  }
  catch(error){
    console.log("ldapRegisterController",error);
    resp.json({status:403,message:'Not Register',data:''});
  }
}

/**************register api using mongodb end*********************/

/**************login api using mongodb start*********************/

module.exports.loginusingMongoControll=async function(req,resp){

  try{
    let data=await ldapRegisterController.loginusingMongo(req);
    console.log("dataforldap",data);
    resp.json ({data})
    }
    catch(error){
      console.log("ldapRegisterController",error);
      resp.json ({error})
    }

  // try{
  // let data=await ldapRegisterController.loginusingMongo(req);
  // console.log("dataforldap",data);
  // if(!(isEmpty(data.token))){
  //   console.log("data.token",data.token);
  // resp.json({status:'true',message:'Successfully Login',data});
  // }else{
  //   console.log("data.token inside else",data.token);
  //   resp.json({status:'false',message:'Not Login new condition',data:''});
  // }
  // }
  // catch(error){
  //   console.log("ldapRegisterController",error);
  //   // resp.json({status:'false',message:'Not Login',data:''});
  // }
}

/**************login api using mongodb end*********************/
function isEmpty(returnData){
  console.log("returnData",returnData);
 if(returnData == null){
  return true
 }
 else if(returnData == ""){
  return true
 }
 else if(returnData == undefined){
  return true
 }
 return false;
}
