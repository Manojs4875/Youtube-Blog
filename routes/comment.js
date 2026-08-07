const express=require('express');
const router=express.Router();
const comment=require('../models/comments.js');
const {checkforAuthentication}=require('../middleware/authentication.js');
const blog=require('../models/blog.js');
router.post('/:id',checkforAuthentication,async (req,res)=>{
    const blogId=req.params.id;
    
    const {content}=req.body;
    const newComment=new comment({
        content:content,
        createdBy:req.user.id,
        blog:blogId
    });
    await newComment.save();
    res.redirect(`/blog/${blogId}`);
});
module.exports=router;