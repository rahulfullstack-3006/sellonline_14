var BasicDetails=require('../models/basicDetailsSchema');
var moment=require('moment');
const Country=require('country-state-city').Country;
const State=require('country-state-city').State;
const City=require('country-state-city').City;
const dbMongodb=require('../database/mongodb');
const CountryModel=require('../models/countryModel');

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


module.exports.bulkCountryStateCityModel=async function(req,resp){

  try{
    // var dbo=dbMongodb.db('insurance');
    // var countriesBulk=dbo.collection('countries').initializeOrderedBulkOp();
    // var countries=Country.getAllCountries();

    // countries.forEach(country=>{
    //   countriesBulk.insert({name:country.name,short_name:country.isoCode})
    // })
    // countriesBulk.execute();
    // return countriesBulk;
    // var objCountry;
    // var countries=Country.getAllCountries();
    //   countries.forEach(country=>{
    //     // const bulkWriteOperation = {
    //     //   insertMany: {
    //     //     documents: country,
    //     //   },
    //     // };
    //     objCountry=country;
    // }
    // )
  
    //       var bulkWriteOperation = {
    //       insertMany: {
    //         documents: objCountry,
    //       },
    //     };


    // CountryModel.bulkWrite([bulkWriteOperation])

    // const Country=require('country-state-city').Country;
    // const State=require('country-state-city').State;
    // const City=require('country-state-city').City;
    
    
    // const MongoClient=require('mongodb').MongoClient;
    
    // MongoClient.connect('mongodb://localhost:27017/insurance',function(err,db){
    //   if(err) throw err;
    
    //   var dbo=db.db('insurance');
    //   var countriesBulk=dbo.collection('countries').initializeOrderedBulkOp();
    
    //   var countries=Country.getAllCountries();
    
    //   countries.forEach(country=>{
    //     countriesBulk.insert({name:country.name,short_name:country.isoCode});
    //   });
    
    //   countriesBulk.execute();
    //   console.log("Countries inserted",countries);
    // })
    // return countries;

    // Get a list of all countries
    const countries = Country.getAllCountries();

    // Create an array of documents to insert
    const documents = countries.map(country => {
    return {
    name: country.name,
    code: country.isoCode
  };
  });

  // Define an array of operations to perform
  const operations = documents.map(document => {
  return {
    insertOne: {
      document: document
    }
  };
});


// Perform the bulk operation
// CountryModel.bulkWrite(operations)
//   .then(result => {
//     console.log('Bulk operation completed successfully:', result);
//   })
//   .catch(error => {
//     console.error('Bulk operation failed:', error);
//   });

let results=await CountryModel.bulkWrite(operations);
return results
  
  }
  catch(err){
    console.log("error in catch",err);
    return err
  }

}

