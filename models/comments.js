const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const NinjaSchema=new Schema({
  id:{type:String},
  filename:{type:String},
  comments:[String]
});
const Comment=mongoose.model('comment',NinjaSchema);
module.exports=Comment;
