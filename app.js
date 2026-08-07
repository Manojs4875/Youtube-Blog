const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const Comment=require('./models/comments.js');
const commentRouter=require('./routes/comment.js');
const userRouter=require('./routes/user.js');
const blogRouter=require('./routes/blog.js');
const blog=require('./models/blog.js');
const {checkforAuthentication}=require('./middleware/authentication.js');
const cookieParser=require('cookie-parser');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use((req, res, next) => {
    res.locals.user = null;
    next();
});

app.get('/', checkforAuthentication, (req, res) => {
    res.locals.user = req.user;
    res.render('home');
});

mongoose.connect('mongodb://localhost:27017/blogify').then(() => {
    console.log("Database connected");
}).catch((err) => {
    console.error("Database connection failed:", err);
});

app.get('/signup', (req, res) => {
    res.render('signup');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.locals.user = null;
    res.redirect('/login');
});

app.get('/blog', checkforAuthentication, (req, res) => {
    res.locals.user = req.user;
    res.render('blog');
});

app.get('/Allblogs', checkforAuthentication, async (req, res, next) => {
    try {
        const blogs = await blog.find({});
        res.render('Allblogs', { blogs });
    } catch (err) {
        next(err);
    }
});

app.get('/blog/:id', checkforAuthentication, async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const comments = await Comment.find({ blog: blogId }).populate('createdBy');
        const blogData = await blog.findById(blogId).populate('createdBy');

        if (!blogData) {
            const error = new Error('Blog post not found.');
            error.status = 404;
            throw error;
        }

        res.render('blog-detail', {
            blog: blogData,
            comments,
            message: req.query.message,
            messageType: req.query.type || 'info',
        });
    } catch (err) {
        next(err);
    }
});

app.use('/blog', blogRouter); // for post requests
app.use('/user', userRouter);
app.use('/comment', commentRouter);

app.use((req, res, next) => {
    const error = new Error('Page not found');
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.status || 500);
    res.render('error', {
        status: err.status || 500,
        message: err.message || 'Something went wrong. Please try again later.',
    });
});

const port = 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});