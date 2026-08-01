const router=require('express');
const Router=router();
const {handlesignup,handlelogin}=require('../controller/user.js');
Router.post('/signup',handlesignup);
Router.post('/login',handlelogin);
module.exports=Router;