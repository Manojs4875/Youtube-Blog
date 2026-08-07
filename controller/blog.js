const blog = require('../models/blog.js');

async function createblog(req, res, next) {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).render('blog', {
                message: 'Please provide both a title and content for your blog post.',
                messageType: 'warning',
            });
        }

        const coverImageUrl = req.file ? `/uploads/${req.file.filename}` : null;
        const newblog = await blog.create({
            title,
            content,
            coverImageUrl,
            createdBy: req.user.id,
        });

        return res.redirect('/Allblogs');
    } catch (err) {
        next(err);
    }
}

module.exports = { createblog };