const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const userRouter=require('./routes/user.js');
const blogRouter=require('./routes/blog.js');
const blog=require('./models/blog.js');
const {checkforAuthentication}=require('./middleware/authentication.js');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.get('/',checkforAuthentication,(req,res)=>{
    res.locals.user=req.user;
    res.render('home');
});
mongoose.connect('mongodb://localhost:27017/blogify').then(()=>{
    console.log("Database connected");
}).catch((err)=>{
    console.log(err);
});
app.get('/signup',(req,res)=>{
    res.locals.user=null;
    res.render('signup');
});
app.get('/login',(req,res)=>{
     res.locals.user=null;
    res.render('login');
})
app.get('/logout',(req,res)=>{
    res.clearCookie('token');
    res.locals.user=null;
    res.redirect('/login');
});
app.get('/blog',(req,res)=>{
    res.render('blog');
});
app.get('/Allblogs',checkforAuthentication,async (req,res)=>{
    const blogs=await blog.find({});
    res.render('Allblogs',{blogs});
});
app.use('/blog',blogRouter);
app.use("/user",userRouter);
const port=8000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});