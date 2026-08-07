const mongoose=require('mongoose');
const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,},
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    }
},{timestamps:true});
const comment=mongoose.model("Comment",commentSchema);
module.exports=comment;