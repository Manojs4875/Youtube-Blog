const router=require('express');
const Router=router(); 
const upload=require('../middleware/upload.js');
const {checkforAuthentication}=require('../middleware/authentication.js');
const {createblog}=require('../controller/blog.js');
Router.post('/',upload.single('coverImageUrl'),checkforAuthentication,createblog);
module.exports=Router;