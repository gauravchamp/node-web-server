const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   user:{
       type:mongoose.Schema.Types.ObjectId,
       ref:'users'
   },
   title:{
       type:String,
       required:true
   },
   body:{
       type:String
   },
   slug:{
       type:String,
       required:true
   },
   image:{
       type:String
   }
});

  module.exports=User=mongoose.model('posts',PostSchema);