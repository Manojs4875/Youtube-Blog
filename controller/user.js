const {generateToken,verifyToken}=require("../service/authenication.js");
const user=require("../models/user.js");
const bcrypt=require("bcrypt");
async function handlesignup(req,res){
    const {name,email,password,profile,role}=req.body;
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const newUser=await user.create({
        name,
        email,
        password:hashedpassword,
        profile,
        role
    })
    // create a token for the user
    const token=await generateToken(newUser);
    
    res.cookie("token",token);
    return res.redirect('/');
}
async function handlelogin(req,res){
    const {email,password}=req.body;
    const userData=await user.findOne({email})
    
    if(!userData){
        return  res.render('login',{message:"User not found"})}
    const ismatch=await bcrypt.compare(password,userData.password);
    if(!ismatch){
        return res.render('login',{message:"Invalid password"});
    }
    
    const token=await generateToken(userData);
    res.cookie("token",token);
    return res.redirect('/');}
    module.exports={handlesignup,handlelogin};
