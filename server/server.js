const express=require('express');
const app=express();
const config=require('./config.json');
let portcheck=config.port
const bodyParser=require('body-parser');
const baseRouter=require('./routers/route');
const cors=require('cors');
const path=require('path');
const db=require('./database/db');
const mongodb=require('./database/mongodb');





//LDAP SETUP//
// const ldap = require('ldapjs');
// var user="uid=admin,ou=system";
// var testPassword="secret";
// var client = ldap.createClient({
//   url: 'ldap://localhost:10389'
//  });

// function authenticateDN(usernameTest,password){

//  client.bind(usernameTest, password, (err) => {
//    if(err){
//     console.log("Error in new connection",err);
//    }
//    else{
//     console.log("LDAP Connection Success");
//     //  searchUser();
//     // addUser()

//    }
// });
// }

// authenticateDN(user,testPassword);

// function addUser(){
//   var entry = {
//     sn: 'bar',
//     objectclass: 'inetOrgPerson'
//   };
//   client.add('cn=michael,ou=users,ou=system', entry, (err) => {
//     if(err){
//       console.log("err in new user",err);
//     }else{
//       console.log("added new user");
//     }
//   });
// }

// function searchUser(){
//   const opts = {
//     // filter: '(objectClass=*)',
//     filter: '(|(cn=jil)(cn=test))',
//     scope: 'sub',
//     attributes: ['sn', 'cn']
//   };
//   client.search('ou=users,ou=system', opts, (err, res) => {
//     if(err){

//       console.log("Error in new connection search",err);
//     }else{
//         res.on('searchRequest', (searchRequest) => {
//     console.log('searchRequest: ', searchRequest.messageId);
//   });
//   res.on('searchEntry', (entry) => {
//     console.log('entry: ' + JSON.stringify(entry.pojo));
//   });
//   res.on('searchReference', (referral) => {
//     console.log('referral: ' + referral.uris.join());
//   });
//   res.on('error', (err) => {
//     console.error('error: ' + err.message);
//   });
//   res.on('end', (result) => {
//     console.log('status: ' + result.status);
//   });
//     }
// });
  
// }


app.get('/retest',(req,res)=>{
  res.send('hello')
})

app.post('/datasend',(req,res)=>{
  let name=req.body.name;
  console.log("name",name);
  res.status(200).send('name send')
})


// app.post('/ldapRegister',(req,res)=>{
//   // const username = req.body.username;
//   var password = req.body.password;
//   const email = req.body.email;

//   console.log("password",password);
//   res.send(password)

//   // const user = {
//   //   cn: username,
//   //   userPassword: password,
//   //   mail: email,
//   //   objectClass: ['inetOrgPerson', 'posixAccount']
//   // };
  
  

//   // client.add(`cn=${username},ou=users,ou=system`, user, (err) => {
//   //   if (err) {
//   //     console.error(err);
//   //     res.status(500).send('LDAP registration failed');
//   //   } else {
//   //     console.log('LDAP registration successful');
//   //     res.status(200).send('LDAP registration successful');
//   //   }
//   // });
  
// })



//end//

// app.get('/*',function(req,res){

//   res.sendFile(path.join(__dirname,"client/index.html"))
// })
app.use(cors({
  origin:config.serverurl
}))

app.use(bodyParser.json({limit:"50mb"}));
app.use('/api/base',baseRouter);    

app.listen(portcheck,()=>{
  console.log("Server is listening on port",portcheck);
})