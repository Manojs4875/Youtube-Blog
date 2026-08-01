const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        default:"public/profile.png"
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    }
});
const user=mongoose.model("user",userSchema);
module.exports=user;