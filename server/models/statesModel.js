const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const stateSchema=new Schema({

  name:{
    type:String,
    required:true
  },

  country_short_name:{
    type:String,
    required:true
  },
  state_name:{
    type:String,
    required:true
  }
})

const State = mongoose.model('State', stateSchema);
module.exports=State;