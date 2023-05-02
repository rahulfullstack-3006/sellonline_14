const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const sisPersonalDetailsSchema = new Schema({
  purchasing_for: String,
  buying_for: String,
  occupation: String,
  age_proof: String,
  education_qualification:String,
  annual_income:String,
  pan_number:String,
  autopay:String,
  nominee_name:String,
  nominee_relationship:String,
  gst_check:String,
  existing_check:String,
  sisId:Number  
});

const SISPersonalDetails = mongoose.model('SIS_Personal_Details', sisPersonalDetailsSchema);
module.exports=SISPersonalDetails;

