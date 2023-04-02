const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const basicDetailsSchema = new Schema({
  id:Number,
  address:String,
  city:String,
  dob:Date,
  email:String,
  first_name: String,
  insurance_type: String,
  last_name: String,
  middle_name: String,
  mobile: Number,
  state:String,
  leadId:String
  
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