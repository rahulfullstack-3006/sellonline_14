var BasicDetails=require('../models/basicDetailsSchema');
var moment=require('moment');


module.exports.getLeadDashboardModel=async function(req,resp){
  try{
    let data =await BasicDetails
    .find()
    .sort({_id:-1});
    console.log("data for try",data);
    return data;
  }
  catch(err){
    return err
  }
}

module.exports.getEachLeadDetailModel=async function(req,resp){
  try{
    let data =await BasicDetails.findOne({_id:req.params.id});
    console.log("data for try",data);
    return data;
  }
  catch(err){
    return err
  }
}

module.exports.createLeadDashboardModel=async function(req,resp){
  // console.log("call huha create Lead");
  let dobObj=req.body.dob;
  console.log("dobObj",dobObj);
  // let leadDate=dobObj.moment().format("MMM DO YY");
  // console.log("leadDate",leadDate);
  var leadId = String(Math.floor(Math.random() * 9000000000000) + 1000000000000);
  console.log("leadId",typeof(leadId));
  let basicDetails=new BasicDetails({
    address:req.body.address,
    // password:req.body.password,
    state:req.body.state,
    city:req.body.city,
    dob:dobObj,
    email:req.body.email,
    first_name:req.body.first_name,
    middle_name:req.body.middle_name,
    last_name:req.body.last_name,
    insurance_type:req.body.first_name,
    mobile:req.body.mobile,
    leadId:leadId
  })
  console.log("basicDetails",basicDetails);
  try{
    let data =await basicDetails.save();
    console.log("data for try",data);
    return data;
  }
  catch(err){
    console.log("error in catch",err);
    return err
  }
}



module.exports.updateLeadDashboardModel=async function(req,resp){
  console.log("id",req.params.id);
  try{
    let data=await BasicDetails.findOneAndUpdate({_id:req.params.id},{
      $set:{
        address:req.body.address,
        state:req.body.state,
        city:req.body.city,
        dob:req.body.dob,
        email:req.body.email,
        first_name:req.body.first_name,
        middle_name:req.body.middle_name,
        last_name:req.body.last_name,
        insurance_type:req.body.first_name,
        mobile:req.body.mobile
      }
    },{
      new:true,
      useFindAndModify:false
    })
    return data;
  }
  catch(err){
    return err
  }

}



module.exports.deleteLeadDashboardModel=async function(req,resp){
  console.log("id",req.params.id);
  try{
    let data=await BasicDetails.remove({_id:req.params.id})
    return data;
  }
  catch(err){
    return err
  }

}

module.exports.searchLeadDashboardModel=async function(req,resp){
  console.log("key",req.params.key);
  // var regex=new RegExp(req.params.name,'i');
  try{
    let data=await BasicDetails.find(
      {
        "$or":[
          {"first_name":{$regex:req.params.key}},
          {"middle_name":{$regex:req.params.key}},
          {"last_name":{$regex:req.params.key}},
          {"email":{$regex:req.params.key}},
          {"address":{$regex:req.params.key}},
          {"city":{$regex:req.params.key}},
          {"state":{$regex:req.params.key}},
          {leadId:{$regex:req.params.key}},


        ]
      }
      )
    return data;
  }
  catch(err){
    return err
  }

}

