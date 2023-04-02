const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const signupSchema = new Schema({
  id:Number,
  username:String,
  email:String,
  password:String,
  
});

const SignupSchema = mongoose.model('sign_up', signupSchema);
module.exports=SignupSchema;