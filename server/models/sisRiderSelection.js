const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const sisRiderSelectionSchema=new Schema({
  wellnessFlag:String,
  death_radio:String,
  hosiptal_radio:String,
  criticare_plus:String,
  atpd_rider:String,
  tb_rider:String,
  ad_rider:String,
  hospicare_rider:String

})

const SISRiderSelection=mongoose.model('SIS_Rider_Selection',sisRiderSelectionSchema);
module.exports=SISRiderSelection;