const user=require("./models/user.js")
const bcrypt=require("bcrypt");
async function handlesignup(req,res){
    const {name,email,password,profile,role}=req.body;
    const hashedpassword=await bcrypt.hash(password,10);
    await user.create({
        name,
        email,
        password:hashedpassword,
        profile,
        role
    })
    res.render('home');
}

async function handlelogin(req,res){
    const {email,password}=req.body;
    const userData=await user.findOne({email})
    if(!userData){
        return  res.status(400).send("User not found");}
    const ismatch=await bcrypt.compare(password,userData.password);
    if(!ismatch){
        return res.status(400).send("Invalid password");
    }
    res.render('home');}
    module.exports={handlesignup,handlelogin};