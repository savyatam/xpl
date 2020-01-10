const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const NinjaSchema=new Schema({
  name:{type:String},
  price:{type:Number}
});
const UserSchema=new Schema({
  email:{type:String,required:true},
  password:{type:String,required:true}
});
const Ninja=mongoose.model('ninja',NinjaSchema);
const User=mongoose.model('user',UserSchema);
module.exports={Ninja:Ninja,User:User};
