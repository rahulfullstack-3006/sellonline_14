const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const stateSchema=new Schema({

  name:{
    type:String,
    required:true
  },

  state_name:{
    type:String,
    required:true
  }
})

const City = mongoose.model('City', stateSchema);
module.exports=City;