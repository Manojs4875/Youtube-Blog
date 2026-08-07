const express = require('express');
const router = express.Router();
const Comment = require('../models/comments.js');
const { checkforAuthentication } = require('../middleware/authentication.js');
const blog = require('../models/blog.js');

router.post('/:id', checkforAuthentication, async (req, res, next) => {
    try {
        const blogId = req.params.id;
        const { content } = req.body;

        if (!content || !content.trim()) {
            return res.redirect(`/blog/${blogId}?message=Comment cannot be empty.&type=danger`);
        }

        const existingBlog = await blog.findById(blogId);
        if (!existingBlog) {
            const error = new Error('Unable to find the blog to comment on.');
            error.status = 404;
            throw error;
        }

        const newComment = new Comment({
            content: content.trim(),
            createdBy: req.user.id,
            blog: blogId,
        });
        await newComment.save();

        res.redirect(`/blog/${blogId}`);
    } catch (err) {
        next(err);
    }
});

module.exports = router;