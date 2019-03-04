const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   user:{
       type:Schema.Types.ObjectId,
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
   }
});

  module.exports=User=mongoose.model('posts',PostSchema);