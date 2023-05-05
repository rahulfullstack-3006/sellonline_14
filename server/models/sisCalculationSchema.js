const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sisCalculationDetailsSchema=new Schema({
  annual_invest_amount:String,
  annual_invest_text:String,
  regular:String,
  pay_mode:String,
  period_of:String,
  ppt_select:String,
  income_period:String,
  income_mode:String,
  rider_package:String,
  receive_amount:String,

})

const SISCalculation=mongoose.model('SIS_Calculation',sisCalculationDetailsSchema);
module.exports=SISCalculation;