
const ldap = require('ldapjs');
const mongodb=require('../database/mongodb');
const jwt=require('jsonwebtoken');
const SignupSchema=require('../models/signupSchema');
const bcrypt=require('bcrypt');
const ActiveDirectory = require('activedirectory2');
// var user="uid=admin,ou=system";
// var testPassword="secret";
var client = ldap.createClient({
  url: 'ldap://localhost:10389'
 });
//  const {LdapAuthManager, LdapUserProvider, Security} = require('ldap-login');
//  const ldapAuthManager = new LdapAuthManager({
//   url: 'ldap://localhost:10389',
//   baseDn: 'ou=users,ou=system', // Base domain. Your user must be in a lower level
//   idKey: 'cn' // Key user as username
// })
// const ldapTest = new Security({manager: ldapAuthManager,
//   provider: LdapUserProvider});
//  const {SecurityMiddleware, Roles} = require('ldap-login');
//  const security = new SecurityMiddleware({jwtPrivateKey: 'secret_key'});




 module.exports.ldapLoginModel=async function(req,resp){
  console.log("reqqqqqqqqqqq",req.body.username,req.body.password);
  try{
    const AD = require('activedirectory2').promiseWrapper;
const config = { url: 'ldap://localhost:10389',
               baseDN: 'ou=users,ou=system',
               username: 'nilesh',
               password: 'secret124' }
               console.log("config",config.username,config.password);
const ad = new AD(config);
console.log("adddd",ad);

await ad.authenticate(config.username, config.password, function(err, auth) {
  // if (err) {
  //   console.log('ERROR: '+JSON.stringify(err));
  //   return;
  // }
  var opts={
    username:req.body.username,
    password:req.body.password,
    dn:'ou=users,ou=system'
  }

  if (auth === false) {
    console.log('Authenticated!');
    ad.findUser(config.username,opts, function(err, user) {
      if (err) {
        console.log('ERROR: ' +JSON.stringify(err));
        return;
      }
    
      if (! user) console.log('User: ' + config.username + ' not found.');
      else console.log(JSON.stringify(user));
    });
  }
  else {
    console.log('Authentication failed!');
  }
});

        //using activedirectory2//
        // let username=req.body.username;
        // let password=req.body.username;
        // // const ad = new ActiveDirectory({
        // //   url: 'ldap://localhost:10389/ou=users,ou=system',
        // //   baseDN: 'ou=users,ou=system',
        // //   // username: req.body.username,
        // //   password: req.body.password    
        // // });
        // console.log("adddddddd",ad);
        // ad.authenticate(username,password,(err,auth) => {
        //   console.log("authhhh",auth);
        //   if (err) {
        //     console.log('Authentication failed:', err);
        //   } else {
        //     console.log('Authentication succeeded:', auth);
        //     ad.findUser({dn:'ou=users,ou=system'},function(err,user){
        //       if(err){
        //         console.log("User auth dn error",err);
        //         // return
        //       }
        //       else{
        //         console.log("userfind",JSON.stringify(user))
        //       }
        //     })
        //   }
        // });

        //using ldapjs
  // let readerDN='ou=users,ou=system';
  // let readerPwd=req.body.password;
  //   var result = ""; 
  //   console.log("readerPwd",readerDN,readerPwd);
  //   client.bind(readerDN, readerPwd, function(err) {
  //     if (err){
  //     result += "Reader bind failed " + err;
  //     }
  //     // resp.send(result);
  //   var filter = `(cn=${req.body.username})`;
  //   console.log("filter",filter)
  //   // result += `LDAP filter: ${filter}\n`;
  //   // console.log("result",result);

  //   client.search('ou=users,ou=system',{filter:filter, scope:"sub"},(err,searchRes)=>{
  //     console.log("searchRes",searchRes);
  //     var searchList = []
  //     if (err) {
  //       result += "Search failed " + err;
  //       resp.send(result);
  //       return;
  //   }
  //   else{
  //     searchRes.on("searchEntry", (entry) => {
  //       console.log("entryyyyy",entry);
  //       result += "Found entry: " + entry + "\n";
  //       searchList.push(entry);
  //   });
  //   searchRes.on("error", (err) => {
  //     result += "Search failed with " + err;
  //     resp.send(result);
  // });
  //    searchRes.on("end",(retVal)=>{
  //     result += "Search results length: " + searchList.length + "\n";
  //     for(var i=0; i<searchList.length; i++){
  //       result += "DN:" + searchList[i].objectName + "\n";
  //       result += "Search retval:" + retVal + "\n";
  //       if (searchList.length === 1) {
  //         client.bind(searchList[0].objectName, req.body.password, function(err) {
  //             if (err)
  //                 result += "Bind with real credential error: " + err;
  //             else
  //                 result += "Bind with real credential is a success";
  //                 resp.send(result);
  //         })
  //       }
  //     }
  //    })
  //   }
  //   })
  //   })


    // // const {username, password} = req.body
    // const username=req.body.username
    // const password=req.body.password
    // console.log("username",username,password);
    // // Here we use the configured ldap client to get a user
    // const user = await ldap.login(username, password);
    // console.log("user for ldap",user);
    // // const statusCode = user.username ? 200 : 403
    // return {data:user}
  
  }
  catch(err){

  }
 }
//  app.post('/auth', async (req, res) => {
//   const {username, password} = req.body
//   // Here we use the configured ldap client to get a user
//   const user = await ldap.login(username, password)
//   const statusCode = user.username ? 200 : 403
//   res.status(statusCode).json(user)
// })





// const ldapUserProviderCnf = {
//   roleUserDn: 'cn=user,dc=genealogy,dc=my-company,dc=com', // Role object in LDAP to store basic users
//   roleAdminDn: 'cn=admin,dc=genealogy,dc=my-company,dc=com', // Role object in LDAP to store admin users
//   ldapAdminLogin: 'cn=admin,dc=my-company,dc=com', // I recommend a READ ONLY admin
//   ldapAdminPassword: 'admin',
//   jwtPrivateKey: 'XXXXXXXX', // This key will be used to generate Tokens
//   jwtExpiration: 60 * 60
// }



  // ldap.login('your_user', 'your_password').then(user => {
  //   /* User should contain something like this:
  //   {
  //     username: 'your_user',
  //     description: 'A description',
  //     roles: ['ROLE_USER', 'ROLE_ADMIN'],
  //     token: "hdiIJyui7668..."
  //   }
  //   If user:pwd is not valid it will return a void object
  //   */
  // })

 function authenticateDN(usernameTest,password){

  client.bind(usernameTest, password, (err) => {
    if(err){
     console.log("Error in new connection",err);
    }
    else{
     console.log("LDAP Connection Success");
      // searchUser();
    //  addUser()
    // updateUser('cn=rahuldev1,ou=users,ou=system')
 
    }
 });
 }
 
 authenticateDN('uid=admin,ou=system','secret');
 
 function addUser(){
   var entry = {
     sn: 'bar',
     objectclass: 'inetOrgPerson'
   };
   client.add('cn=michael,ou=users,ou=system', entry, (err) => {
     if(err){
       console.log("err in new user",err);
     }else{
       console.log("added new user");
     }
   });
 }
 
 function searchUser(){
   const opts = {
     // filter: '(objectClass=*)',
     filter: '(|(cn=jil)(cn=test))',
     scope: 'sub',
     attributes: ['sn', 'cn']
   };
   client.search('ou=users,ou=system', opts, (err, res) => {
     if(err){
     console.log("Error in new connection search",err);
     }else{
         res.on('searchRequest', (searchRequest) => {
     console.log('searchRequest: ', searchRequest.messageId);
   });
   res.on('searchEntry', (entry) => {
     console.log('entry: ' + JSON.stringify(entry.pojo));
   });
   res.on('searchReference', (referral) => {
     console.log('referral: ' + referral.uris.join());
   });
   res.on('error', (err) => {
     console.error('error: ' + err.message);
   });
   res.on('end', (result) => {
     console.log('status: ' + result.status);
   });
     }
 });
   
 }

module.exports.ldapRegisterModel=async function(req,resp){
  try{
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const sn=req.body.sn;

    console.log("object",password,email);
    const userRegisterLdap = {
      sn:sn,
      userPassword: password,
      mail: email,
      objectClass: 'inetOrgPerson' 
    };
    console.log("userRegisterLdap",userRegisterLdap);
    client.add(`cn=${username},ou=users,ou=system`, userRegisterLdap, (err) => {
      if (err) {
        console.error(err);
      } else {
        console.log('LDAP registration successful');
      }
    });
    return{status:'true',userRegisterLdap:userRegisterLdap}
  }
  catch(error){
    return{status:'false',userRegisterLdap:''}
  }
}


function authenticateLDAP(usernameTest,password){
  console.log("authenticate",usernameTest,password);
  client.bind(usernameTest, password, (err) => {
    if(err){
     console.log("Error in new connection",err);
    }
    else{
     console.log("LDAP Connection Success");
      // searchUserLogin();
    }
 });
 }


// module.exports.ldapLoginModel=async function(req,resp){
//   try{
//     const username = req.body.username;
//     const password = req.body.password;
//     // const sn=req.body.sn;

//     authenticateLDAP(username,password);

//     // return{status:'true',userLoginLdap:userLoginLdap}
//   }
//   catch(error){
//     // return{status:'false',userLoginLdap:userLoginLdap} 
//   }
// }

function searchUserLogin(){
  const opts = {
    filter: `(cn=${username})`,
    scope: 'sub',
    attributes: ['sn', 'cn']
  };
  console.log("optssss",opts);
  client.search(`cn=${username},ou=users,ou=system`, opts, (err, res) => {
    if(err){
    console.log("Error in new connection search",err);
    }else{
        res.on('searchRequest', (searchRequest) => {
    console.log('searchRequest: ', searchRequest.messageId);
  });
  res.on('searchEntry', (entry) => {
    console.log('entry: ' + JSON.stringify(entry.pojo));
  });
  res.on('searchReference', (referral) => {
    console.log('referral: ' + referral.uris.join());
  });
  res.on('error', (err) => {
    console.error('error: ' + err.message);
  });
  res.on('end', (result) => {
    console.log('status: ' + result.status);
  });
    }
});
}


// Hash the password using the appropriate algorithm (e.g. SHA-256)
function hashPassword(password) {
  const crypto = require('crypto');
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('base64');
}
// module.exports.ldapLoginModel=async function(req,resp){
//   try{
//     const username = req.body.username;
//     const password = req.body.password;
//     const sn=req.body.sn;
//     client.bind(`cn=${username},ou=users,ou=system`, password, (err) => {
//       if (err) {
//         console.error(err);
//         // return res.status(401).json({ error: 'Login failed' });
//       } else {
//         console.log('LDAP login successful');
//         const opts = {
//           filter: `(cn=${username})`,
//           scope: 'sub',
//           attributes: ['sn', 'cn'],
//           password:password,
//           objectClass: 'inetOrgPerson' 
//         };
//         console.log("opts",opts);
//         client.search('ou=users,ou=system', opts, (err, res) => {
//           console.log("ressssss",res);
//           if(err){
//             console.log("Error in new connection search",err);
//           }else{
//               res.on('searchRequest', (searchRequest) => {
//           console.log('searchRequest: ', searchRequest.messageId);
//         });
//         res.on('searchEntry', (entry) => {
//           console.log('entry: ' + JSON.stringify(entry.pojo));
//           const userPassword = entry.pojo.objectName;
//           console.log("userPassword",userPassword);
//           // const hashedPassword = hashPassword(password);
//           // if (hashedPassword !== userPassword) {
//           //   console.log("Login failed");
//           // }
//           /*****************token*************/
//           // const token=jwt.sign({username:userPassword.username,email:userPassword.email},'secret_key',{
//           //   expiresIn:'24h'
//           // })
//           // return{status:'true',userLoginLdap:userPassword,token}
//           /*****************token*************/
//         });
//           }
//       });
//       }
//     });
//     // return{status:'true',userLoginLdap:userLoginLdap}
//   }
//   catch(error){
//     // return{status:'false',userLoginLdap:userLoginLdap}
    
//   }
// }


// module.exports.ldapLoginModel=async function(req,resp){
//   try{
//     const username = req.body.username;
//     const password = req.body.password;
//     const sn=req.body.sn;
//     client.bind(`cn=${username},ou=users,ou=system`, password, (err) => {
//       if (err) {
//         console.error(err);
//         // return res.status(401).json({ error: 'Login failed' });
//       } else {
//         console.log('LDAP login successful');
//         const opts = {
//           filter: `(cn=${username})`,
//           scope: 'sub',
//           attributes: ['sn', 'cn'],
//           password:password,
//           objectClass: 'inetOrgPerson' 
//         };
//         console.log("opts",opts);
//         client.search('ou=users,ou=system', opts, (err, res) => {
//           console.log("ressssss",res);
//           if(err){
//             console.log("Error in new connection search",err);
//           }else{
//               res.on('searchRequest', (searchRequest) => {
//           console.log('searchRequest: ', searchRequest.messageId);
//         });
//         res.on('searchEntry', (entry) => {
//           console.log('entry: ' + JSON.stringify(entry.pojo));
//           const userPassword = entry.pojo.objectName;
//           console.log("userPassword",userPassword);
//           // const hashedPassword = hashPassword(password);
//           // if (hashedPassword !== userPassword) {
//           //   console.log("Login failed");
//           // }
//           /*****************token*************/
//           // const token=jwt.sign({username:userPassword.username,email:userPassword.email},'secret_key',{
//           //   expiresIn:'24h'
//           // })
//           // return{status:'true',userLoginLdap:userPassword,token}
//           /*****************token*************/
//         });
//           }
//       });
//       }
//     });
//     // return{status:'true',userLoginLdap:userLoginLdap}
//   }
//   catch(error){
//     // return{status:'false',userLoginLdap:userLoginLdap}
    
//   }
// }

function updateUser(dn){
  var changeLDAP = new ldap.Change({
    operation: 'add',
    modification: {
      displayName: ['346']
    }
  });

  client.modify(dn, changeLDAP, (err) => {
    if(err){
    console.log("Error in new connection",err);
    }else{
    console.log('User modify successfully');
    }
  });
}

module.exports.updateModel=async function(req,resp){
  try{

    let userModify=req.body.userModify;
    console.log("userModify",userModify);
    var changeTest = new ldap.Change({
      operation: 'add',
      modification: {
        displayName: userModify,
        sn:req.body.sn,
        objectClass: 'inetOrgPerson' 
      }
    });

    // var changeTest={
    //     displayName: userModify,
    //     sn:req.body.sn,
    //     objectClass: 'inetOrgPerson' 
    // }

    console.log("change",changeTest);

    client.modify('cn=jil,ou=users,ou=system', changeTest, (err) => {
      if(err){
      console.log("Error in new connection",err);
      }else{
      console.log('User modify successfully');
      }
    });
    return {status:true,message:'User modify'};
  }
  catch(error){
    return {status:false,message:''};
     
  }

}

module.exports.deleteModel=async function(req,resp){
  let username=req.body.username
  try{
    // client.delete('cn=mike,ou=users,ou=system',(err)=>{
    client.delete(`cn='${username}',ou=users,ou=system`,(err)=>{
      if(err){
        console.log('Error in delete');
      }
      else{
        console.log('deleted data successfully');
      }
    });
    return {status:'true',message:'delete data'}
  }
  catch(err){
    return {status:'false',message:''}

  }
}


 
/**************register api using mongodb start*********************/

module.exports.registerusingMongo=async function(req,resp){
  let bcryptPassword=await bcrypt.hash(req.body.password,10);
  console.log("bcrypt",bcryptPassword);  //email id check --->select query
  let signupSchema=new SignupSchema({
    username:req.body.username,
    email:req.body.email,
    password:bcryptPassword
  })
  console.log("signupSchema",signupSchema);
  console.log("req.body.email",req.body.email);
  let userCreated=await SignupSchema.findOne({email:req.body.email});
  console.log("userCreated",userCreated);

  if (!userCreated) {
    try{
      let data =await signupSchema.save();
      console.log("data for register",data);
      return data;
    }
    catch(err){
      return err
    }
  }else{
    return {status:403,message:'Email Already exits'} 
  }

}

/**************register api using mongodb end*********************/


/**************login api using mongodb*********************/
module.exports.loginusingMongo=async function(req,resp){   //need to handle for same username and wrong password enter it will redirect
  try{
    let user =await SignupSchema.find({username:req.body.username})
    console.log("userrrrr",user);;
    if(user.length >0){
     let result= await bcrypt.compareSync(req.body.password,user[0].password);
     console.log("result",result);
     if(result == true){
      let token=jwt.sign({username:user[0].username,email:user[0].email,password:user[0].password},'secret_key',{
        expiresIn:"24h"
      })
      return {status:200,message:'Successfully login',username:user[0].username,email:user[0].email,token};
     }
     else{
      return {status:401,message:'Invalid Credentials',username:'',email:''};
    }
    }else{
      return {status:409,message:"User not exists",username:"",email:"",token:''};
    }
  }
  catch(err){
    return err
  }
}

/**************login api using mongodb*********************/