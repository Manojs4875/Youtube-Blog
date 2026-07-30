const {schema}=require('mongoose');
const userSchema=new schema({
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
module.exports=userSchema;