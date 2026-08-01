const jwt=require('jsonwebtoken');
const secret="@N#NF803";
async function generateToken(user){
    const payload={
        id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    }
    const token=jwt.sign(payload,secret,{expiresIn:'10m'});
    return token;
}
async function verifyToken(token){
    try{
        const decoded=await jwt.verify(token,secret);
        return decoded;
    }catch(err){
        throw new Error("Invalid token");
    }   }
    module.exports={
        generateToken,
        verifyToken
    }
