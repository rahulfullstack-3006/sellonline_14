const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const basicDetailsSchema = new Schema({
  // id:Number,
  // address:String,
  // city:String,
  // dob:Date,
  // email:String,
  // first_name: String,
  // insurance_type: String,
  // last_name: String,
  // middle_name: String,
  // mobile: Number,
  // state:String,
  // leadId:String,
  // country:String,
  // gender:String,
  // marital_status:String,
  // resident_status:String,
  // disposition:String,
  // sub_disposition:String,
  // landmark:String,
  // pincode:Number,
  // agent_servicing_state:String

  insurance_type: String,
  first_name: String,
  middle_name: String,
  last_name: String,
  gender:String,
  dob:Date,
  marital_status:String,
  resident_status:String,
  disposition:String,
  sub_disposition:String,
  address:String,
  landmark:String,
  country:String,
  state:String,
  city:String,
  pincode:Number,
  email:String,
  mobile: Number,
  agent_servicing_state:String,
  leadId:Number


  
});

const BasicDetails = mongoose.model('Basic_Details', basicDetailsSchema);
module.exports=BasicDetails;




// const mongoose=require('mongoose');
// const Schema = mongoose.Schema;

// const basicDetailsSchema=new Schema({
//   id:{
//     type:Number
//   },
//   address:{
//     type:String
// },
// password:{
//   type:String
// },
// city:{
//     type:String
// },
// dob:{
//     type:Date
// },
// email:{
//     type:String
// },
// first_name:{
//   type:String
// },
// middle_name:{
//   type:String
// },
// last_name:{
//   type:String
// },
// insurance_type:{
//   type:String
// },
// mobile:{
//   type:Number
// },
// },{timestamps:true})

// const BasicDetails=mongoose.model('Basic_Details',basicDetailsSchema);
// module.exports=BasicDetails;