var express=require('express');
var router=express.Router();

const controller=require('../controllers/loginController');
const registerLdap=require('../controllers/ldapRegisterController');
const modelLogin=require('../models/loginModel');
const leadDashboard=require('../controllers/leadDashboardController');
const BasicDetails=require('../models/basicDetailsSchema');
const checkAuth=require('../middleware/checkAuth');
router.post('/register',controller.registerController)
// router.post('/register',modelLogin.registerModel)
router.post('/login',controller.loginController);
 /***register and login using LDAP start **/
router.post('/ldapRegister',registerLdap.ldapRegister);
router.post('/ldapLogin',registerLdap.ldapLogin);
 /***register and login using LDAP end **/
router.post('/updateLDAP',registerLdap.updateLDAP);
router.post('/deleteLDAP',registerLdap.deleteLDAP);
router.get('/leadDashboard',leadDashboard.getLeadDashboardController);
router.post('/leadCreate',leadDashboard.createLeadDashboardController);
router.put('/updateLead/:id',leadDashboard.updateLeadDashboardController);
router.delete('/deleteLead/:id',leadDashboard.deleteLeadDashboardController);
router.get('/getEachLeadDetails/:id',leadDashboard.getEachLeadDetailController);
router.get('/search/:key',leadDashboard.searchLeadDashboardController);

              /***register and login using mongo **/
router.post('/registerusingMongo',registerLdap.registerusingMongoControll);
router.post('/loginusingMongo',registerLdap.loginusingMongoControll);

            /***register and login using mongo **/


// router.get('/index',(req,res,next)=>{
//   BasicDetails.find()
//   .then(response=>{
//     console.log("response",response);
//     res.json({
//       data:response
//     })
//   })
//   .catch(err=>{
//     res.json({
//       message:'An error Occured!'
//     })
//   })
// })

// router.post('/registerMongo',(req,res,next)=>{   //save
//   let basicDetails=new BasicDetails({
//     address:req.body.address,
//     password:req.body.password,
//     city:req.body.city,
//     dob:req.body.dob,
//     email:req.body.email,
//     first_name:req.body.first_name,
//     middle_name:req.body.middle_name,
//     last_name:req.body.last_name,
//     insurance_type:req.body.first_name,
//     mobile:req.body.mobile
//   })
//   console.log("basicDetails",basicDetails);
//   basicDetails.save()
//   .then(response=>{
//    res.json({
//       message:'Employee Added Successfully',
//       data:response
//    })
//   })
//   .catch(err=>{
//     res.json({
//       message:'An error Occured!'
//     })
//   })
// })



// router.put('/updateMongo/:id',(req,res,next)=>{   //update
//   console.log(req.params.id);
//   // console.log("basicDetails",basicDetails);
//   // basicDetails.save()
//   BasicDetails.findOneAndUpdate({_id:req.params.id},{
//     $set:{
//       address:req.body.address,
//       password:req.body.password,
//       city:req.body.city,
//       dob:req.body.dob,
//       email:req.body.email,
//       first_name:req.body.first_name,
//       middle_name:req.body.middle_name,
//       last_name:req.body.last_name,
//       insurance_type:req.body.first_name,
//       mobile:req.body.mobile
//     }
//   })
//   .then(response=>{
//    res.json({
//       message:'Employee Added Successfully',
//       updateData:response
//    })
//   })
//   .catch(err=>{
//     res.json({
//       message:'An error Occured!'
//     })
//   })
// })


module.exports=router;

