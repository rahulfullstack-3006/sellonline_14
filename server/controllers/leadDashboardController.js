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
  console.log("getEachLeadDetailController",req.params.id)
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


module.exports.getCountrydropDownController=async function(req,resp){
  try{
    let data=await leadDashboard.getCountrydropDownModel(req);
    // console.log("data",data);
   resp.json({status:'true',message:'Fetch Country dropdown successfully',data});
 
   }
   catch(err){
   resp.json({status:'false',message:'Error in Country fetching dropdown',data});
 
   }

}

module.exports.getStatedropDownController=async function(req,resp){
  try{
    let data=await leadDashboard.getStatedropDownModel(req);
    console.log("data",data);
   resp.json({status:'true',message:'Fetch State dropdown successfully',data});
 
   }
   catch(err){
   resp.json({status:'false',message:'Error in State fetching dropdown',data});
 
   }

}


module.exports.getCitydropDownController=async function(req,resp){
  try{
    let data=await leadDashboard.getCitydropDownModel(req);
    console.log("data",data);
   resp.json({status:'true',message:'Fetch City dropdown successfully',data});
 
   }
   catch(err){
   resp.json({status:'false',message:'Error in City fetching dropdown',data});
 
   }

}


module.exports.getAgentStateController=async function(req,resp){
  try{
    let data=await leadDashboard.getAgentStateModel(req);
    console.log("data",data);
   resp.json({status:'true',message:'Fetch State dropdown successfully',data});
 
   }
   catch(err){
   resp.json({status:'false',message:'Error in State fetching dropdown',data});
 
   }

}

module.exports.createSISPersonalController=async function(req,resp){
  try{
   let data=await leadDashboard.createSISPersonalModel(req);
   console.log("data",data);
  resp.json({status:'true',message:'SIS Created Successfully',data});
  }
  catch(err){
  resp.json({status:'false',message:'Error in SIS Creation'});

  }
}

module.exports.saveSISCalculationController=async function(req,resp){
  try{
   let data=await leadDashboard.saveSISCaluclationModel(req);
   console.log("data",data);
  resp.json({status:'true',message:'SIS Save Successfully',data});
  }
  catch(err){
  resp.json({status:'false',message:'Error in SIS Creation'});

  }
}

module.exports.createSISCalculationController=async function(req,resp){
  try{
   let data=await leadDashboard.createSISCaluclationModel(req);
   console.log("data",data);
  resp.json({status:'true',message:'SIS Calculate Successfully',data});
  }
  catch(err){
  resp.json({status:'false',message:'Error in SIS Calculate'});

  }
}


module.exports.createSISCaluclationInvestTextController=async function(req,resp){
  try{
   let data=await leadDashboard.createSISCaluclationInvestTextModel(req);
   console.log("data",data);
  resp.json({status:'true',message:'SIS Calculate Successfully',data});
  }
  catch(err){
  resp.json({status:'false',message:'Error in SIS Calculate'});

  }
}

module.exports.saveSISRiderSelectionController=async function(req,resp){
  try{
   let data=await leadDashboard.saveSISRiderSelectionModel(req);
   console.log("data",data);
  resp.json({status:'true',message:'SIS Rider Selected Successfully',data});
  }
  catch(err){
  resp.json({status:'false',message:'Error in SIS Rider Selection'});

  }
}
