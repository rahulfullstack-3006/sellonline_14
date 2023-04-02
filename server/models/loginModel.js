// module.exports.loginModel=function(req,resp){
//   try{
//     let name=req.body.name
//     console.log("req====body====----",name);
//     return {status:true,message:"Success",data:name}
//   }catch(error){
//     console.log("Error in  likeCount Method ",error)
//     return {status:false,message:"Failed",data:[]}
//   }
// }

const bcrypt = require('bcrypt');
const connection = require('../database/db');
const sqldb=require('../database/db');

module.exports.registerModel=async function(req,resp){
  let encryptedPassword=await bcrypt.hashSync(req.body.password,10);
  console.log("encryptedPassword",encryptedPassword);
  let userPassword=`SELECT * FROM user_credentials where email='${req.body.email}'`;
  console.log("userPassword",userPassword);
  sqldb.query(userPassword,(error,results)=>{
    console.log("results",results);
    if(error) return error
    if(!results.length){
 
    try{
      let registerObj={
        "id":req.body.id,
        "username":req.body.username,
        "email":req.body.email,
        "password":encryptedPassword,
        "age":req.body.age
      }

      let insertQuery=`INSERT INTO user_credentials VALUES('${req.body.id}','${req.body.username}','${req.body.email}',
      '${encryptedPassword}','${req.body.age}')`
       sqldb.query(insertQuery,function(error,rows){
        if(error){
        console.log(error);
        }
      // sqldb.connection.end();
      // connection.end()

        console.log("Register Successfully",rows);
        // resp.status(200).send({
        //   message:'Register Successfully',
        //   result:rows
        // })
        // resp.send(rows)
        return {status:true,message:'Register Successfully'};
      })
    }catch(error){
      return {status:"Failure",message:"Error",data:[]}
    }
  }else{
    // connection.end();
    resp.send('Already Users Exits')
    // console.log("Already Users Exits");
    // return {status:true,message:'Already Users Exits',data:[]};  
  }
  }
  )
}

// module.exports.registerModel=async function(req,resp){
//   let encryptedPassword=await bcrypt.hashSync(req.body.password,10);
//   console.log("encryptedPassword",encryptedPassword);
//   let userPassword=`SELECT * FROM user_credentials where email='${req.body.email}'`;
//   console.log("userPassword",userPassword);
//     try{
//       let registerObj={
//         "id":req.body.id,
//         "username":req.body.username,
//         "email":req.body.email,
//         "password":encryptedPassword,
//         "age":req.body.age
//       }
//       sqldb.query(`INSERT INTO user_credentials VALUES('${req.body.id}','${req.body.username}','${req.body.email}','${encryptedPassword}','${req.body.age}')`,(error,rows)=>{
//         if(error){
//         console.log(error);
//         }
//         return {status:true,message:'Register Successfully',data:rows}
//       })
//     }catch(error){
  
//       return {status:"Failure",message:"Error",data:[]}
//     }


// }


// module.exports.loginModel=async function(req,resp){
//   // let userPassword='12345678';
//     const decrypted=await bcrypt.compareSync(req.body.password,userPassword);
//     console.log("decrypted",decrypted);
//     try{
//       let registerObj={
//         "email":req.body.email,
//         "password":decrypted,
//       }
//       console.log("objectsss",object);
//       return{status:true,message:"Login Successfully",data:registerObj}
  
//     }catch(error){
//      return{status:false,message:"Failure",data:[]}
//     }
  

// }

