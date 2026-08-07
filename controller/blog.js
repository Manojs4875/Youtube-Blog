const blog =require('../models/blog.js');
async function createblog(req,res){
    const {title,content}=req.body;
    const coverImageUrl="/uploads/"+req.file.filename;
    const newblog=await blog.create({
        title,
        content,
        coverImageUrl: coverImageUrl,
        createdBy:req.user.id
    });
    return res.redirect('/');
}
module.exports={createblog};