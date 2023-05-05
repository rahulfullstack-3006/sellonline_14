var BasicDetails=require('../models/basicDetailsSchema');
var SISPersonalDetails=require('../models/sisPersonalDetailsSchema')
// var moment=require('moment');
// const Country=require('country-state-city').Country;
const State=require('country-state-city').State;
// const City=require('country-state-city').City;
// const dbMongodb=require('../database/mongodb');
const CountryModel=require('../models/countryModel');
const StateModel=require('../models/statesModel');
const CityModel=require('../models/cityModel');
const mongoose=require('mongoose');
const SISCalculation = require('../models/sisCalculationSchema');

// console.log(State.getAllStates());


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
    let data =await BasicDetails.findOne({leadId:req.params.id});
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
  console.log("leadId check",leadId);
  let basicDetails=new BasicDetails({
    insurance_type:req.body.insurance_type,
    first_name:req.body.first_name,
    middle_name:req.body.middle_name,
    last_name:req.body.last_name,
    gender:req.body.gender,
    dob:dobObj,
    marital_status:req.body.marital_status,
    resident_status:req.body.resident_status,
    disposition:req.body.disposition,
    sub_disposition:req.body.sub_disposition,
    address:req.body.address,
    landmark:req.body.landmark,
    country:req.body.country,
    state:req.body.state,
    city:req.body.city,
    pincode:req.body.pincode,
    email:req.body.email,
    mobile:req.body.mobile,
    agent_servicing_state:req.body.agent_servicing_state,
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
  console.log("updateid",req.params.id);
  let idLead=parseInt(req.params.id);
  console.log("idLead",idLead);
  console.log("updateid",typeof(idLead));

  try{
    let data=await BasicDetails.findOneAndUpdate({leadId:idLead},{
      $set:{
        insurance_type:req.body.insurance_type,
        first_name:req.body.first_name,
        middle_name:req.body.middle_name,
        last_name:req.body.last_name,
        gender:req.body.gender,
        dob:req.body.dob,
        marital_status:req.body.marital_status,
        resident_status:req.body.resident_status,
        disposition:req.body.disposition,
        sub_disposition:req.body.sub_disposition,
        address:req.body.address,
        landmark:req.body.landmark,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city,
        pincode:req.body.pincode,
        email:req.body.email,
        mobile:req.body.mobile,
        agent_servicing_state:req.body.agent_servicing_state,
        // leadId:leadId
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


module.exports.getCountrydropDownModel=async function(req,resp){

  try{
  // let countries=await CountryModel.find({})  
  let countries=await CountryModel.find({short_name:'IN'})  
  // console.log("data for countries",countries);
  return countries;
  }
  catch(err){
    console.log("error in catch",err);
    return err
  }

}


module.exports.getStatedropDownModel=async function(req,resp){
  console.log("req.params.country_code",req.params.country_code);
    try{
    let states=await StateModel.find({country_short_name:req.params.country_code})  
    console.log("data for states",states);
    return states;
    }
    catch(err){
      console.log("error in catch",err);
      return err
    }
  
  }

  // module.exports.getStatedropDownModel=async function(req,resp){
  //   console.log("req.body.country_short_name",req.body.country_short_name);
  //     try{
  //       // let states=await StateModel.find({})
  //     // let states=await StateModel.find({country_short_name:req.body.country_short_name,name:req.body.name})  
  //     let states=await StateModel.find({country_short_name:req.body.country_short_name})  
  //     console.log("data for states",states);
  //     return states;
  //     }
  //     catch(err){
  //       console.log("error in catch",err);
  //       return err
  //     }
    
  //   }

// module.exports.getCitydropDownModel=async function(req,resp){
// console.log("req.body.state_name",req.body.state_name);
//   try{
//   let cities=await CityModel.find({state_name:req.body.state_name})  
//   console.log("data for cities",cities);
//   return cities;
//   }
//   catch(err){
//     console.log("error in catch",err);
//     return err
//   }

// }

module.exports.getCitydropDownModel=async function(req,resp){
  console.log("req.params.state_name",req.params.state_name);
    try{
    let cities=await CityModel.find({state_name:req.params.state_name})  
    console.log("data for cities",cities);
    return cities;
    }
    catch(err){
      console.log("error in catch",err);
      return err
    }
  
  }

module.exports.getAgentStateModel=async function(req,resp){
      try{
      let states=await State.getStatesOfCountry('IN')
      console.log("data for states",states);
      return states;
      }
      catch(err){
        console.log("error in catch",err);
        return err
      }
    
    }

module.exports.createSISPersonalModel=async function(req,resp){
      var sisId = String(Math.floor(Math.random() * 9000000000000) + 1000000000000);
      console.log("sisId check",sisId);
      let sisCalculationDetails=new SISPersonalDetails({
        purchasing_for:req.body.purchasing_for,
        buying_for:req.body.buying_for,
        occupation:req.body.occupation,
        age_proof:req.body.age_proof,
        education_qualification:req.body.education_qualification,
        annual_income:req.body.annual_income,
        pan_number:req.body.pan_number,
        autopay:req.body.autopay,
        nominee_name:req.body.nominee_name,
        nominee_relationship:req.body.nominee_relationship,
        gst_check:req.body.gst_check,
        existing_check:req.body.existing_check,
        sisId:sisId
      })
      console.log("sisCalculationDetails",sisCalculationDetails);
      try{
        let data =await sisCalculationDetails.save();
        console.log("data for try",data);
        return data;
      }
      catch(err){
        console.log("error in catch",err);
        return err
      }
    }



module.exports.saveSISCaluclationModel=async function(req,resp){
      let sisCalculationDetails=new SISCalculation({
        annual_invest_amount:req.body.annual_invest_amount,
        annual_invest_text:req.body.annual_invest_text,
        regular:req.body.regular,
        pay_mode:req.body.pay_mode,
        period_of:req.body.period_of,
        ppt_select:req.body.ppt_select,
        income_period:req.body.income_period,
        income_mode:req.body.income_mode,
        rider_package:req.body.rider_package,
        receive_amount:req.body.receive_amount,
      })
      console.log("sisCalculationDetails",sisCalculationDetails);
      try{
        let data =await sisCalculationDetails.save();
        console.log("data for try",data);
        return data;
      }
      catch(err){
        console.log("error in catch",err);
        return err
      }
    }    

module.exports.createSISCaluclationModel=async function(req,resp){
      let sisCalculationDetails=new SISCalculation({
        annual_invest_amount:req.body.annual_invest_amount,
        annual_invest_text:req.body.annual_invest_text,
        regular:req.body.regular,
        pay_mode:req.body.pay_mode,
        period_of:req.body.period_of,
        ppt_select:req.body.ppt_select,
        income_period:req.body.income_period,
        income_mode:req.body.income_mode,
        rider_package:req.body.rider_package,
        receive_amount:req.body.receive_amount,
      })
      console.log("sisCalculationDetails",sisCalculationDetails);
      try{
          let calculateReceiveAmount=(req.body.annual_invest_amount + req.body.period_of+req.body.income_period) *11/100;
          console.log("formulaa",req.body.annual_invest_amount,req.body.annual_invest_text,req.body.period_of,req.body.income_period);
          console.log("calculateReceiveAmount",calculateReceiveAmount);
        return Math.floor(calculateReceiveAmount)
      }
      catch(err){
        console.log("error in catch",err);
        return err
      }
    }


module.exports.createSISCaluclationInvestTextModel=async function(req,resp){
      let sisCalculationDetails=new SISCalculation({
        annual_invest_amount:req.body.annual_invest_amount,
        annual_invest_text:req.body.annual_invest_text,
        regular:req.body.regular,
        pay_mode:req.body.pay_mode,
        period_of:req.body.period_of,
        ppt_select:req.body.ppt_select,
        income_period:req.body.income_period,
        income_mode:req.body.income_mode,
        rider_package:req.body.rider_package,
        receive_amount:req.body.receive_amount,
      })
      console.log("sisCalculationDetails",sisCalculationDetails);
      try{
        console.log("formulaa",req.body.annual_invest_text,req.body.period_of,req.body.income_period);
          let calculateInvestTextReceiveAmount=(req.body.annual_invest_text + req.body.period_of + req.body.income_period) *11/100;
          console.log("calculateReceiveAmount",calculateInvestTextReceiveAmount);
        return Math.floor(calculateInvestTextReceiveAmount)
      }
      catch(err){
        console.log("error in catch",err);
        return err
      }
    }