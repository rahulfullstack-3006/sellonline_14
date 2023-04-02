var leadDashboard=require('../models/leadDashboardModel');

module.exports.getLeadDashboardController=async function(req,resp){
  try{
   let data=await leadDashboard.getLeadDashboardModel(req);
   console.log("data",data);
  //  resp.send(data)
  resp.json({status:'true',message:'Fech All Lead Successfully',data});

  }
  catch(err){
    // resp.send(err)
  resp.json({status:'false',message:'Error in Lead Fetch'});

  }
}

module.exports.getEachLeadDetailController=async function(req,resp){
  try{
   let data=await leadDashboard.getEachLeadDetailModel(req);
  //  console.log("data",data);
  //  resp.send(data)
  resp.json({status:'true',message:'Fetch lead details based on ID',data});

  }
  catch(err){
    // resp.send(err)
  resp.json({status:'false',message:'Error in Fetch lead details based on ID'});

  }
}

module.exports.createLeadDashboardController=async function(req,resp){
  try{
   let data=await leadDashboard.createLeadDashboardModel(req);
  //  console.log("data",data);
  //  resp.send(data)
  resp.json({status:'true',message:'Lead Created Successfully',data});
  }
  catch(err){
    // resp.send(err)
  resp.json({status:'false',message:'Error in Lead Creation'});

  }
}


module.exports.updateLeadDashboardController=async function(req,resp){
  try{
   let data=await leadDashboard.updateLeadDashboardModel(req);
   console.log("data",data);
  //  resp.send(data)
  resp.json({status:'true',message:'Lead Updated Successfully',data});

  }
  catch(err){
    // resp.send(err)
  resp.json({status:'false',message:'Error in Lead Updation'});

  }
}


module.exports.deleteLeadDashboardController=async function(req,resp){
  try{
   let data=await leadDashboard.deleteLeadDashboardModel(req);
   console.log("data",data);
  //  resp.send(data)
  resp.json({status:'true',message:'Lead Deleted Successfully',data});

  }
  catch(err){
    // resp.send(err)
  resp.json({status:'false',message:'Error in Lead Deletion',data});

  }
}

module.exports.searchLeadDashboardController=async function(req,resp){
  try{
   let data=await leadDashboard.searchLeadDashboardModel(req);
   console.log("data",data);
  //  resp.send(data)
  resp.json({status:'true',message:'Lead Search Successfully',data});

  }
  catch(err){
    // resp.send(err)
  resp.json({status:'false',message:'Error in Lead search',data});

  }
}