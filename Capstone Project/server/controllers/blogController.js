const Blog = require('../models/Blog');

const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createBlog = async (req, res) => {
    if (!req.body.title || !req.body.content) {
        return res.status(400).json({ message: 'Please add all fields' });
    }

    try {
        const blog = await Blog.create({
            title: req.body.title,
            content: req.body.content,
            imageURL: req.body.imageURL,
            author: req.user.id,
        });
        res.status(201).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Check for user
        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        // Make sure the logged in user matches the goal user
        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (!req.user) {
            return res.status(401).json({ message: 'User not found' });
        }

        if (blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'User not authorized' });
        }

        await blog.deleteOne();
        res.status(200).json({ id: req.params.id });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const likeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }


        if (blog.likes.includes(req.user.id)) {

            blog.likes = blog.likes.filter(id => id.toString() !== req.user.id);
        } else {

            blog.likes.push(req.user.id);
            if (blog.dislikes.includes(req.user.id)) {
                blog.dislikes = blog.dislikes.filter(id => id.toString() !== req.user.id);
            }
        }

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const dislikeBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }


        if (blog.dislikes.includes(req.user.id)) {

            blog.dislikes = blog.dislikes.filter(id => id.toString() !== req.user.id);
        } else {

            blog.dislikes.push(req.user.id);
            if (blog.likes.includes(req.user.id)) {
                blog.likes = blog.likes.filter(id => id.toString() !== req.user.id);
            }
        }

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const commentOnBlog = async (req, res) => {
    const { text } = req.body;
    if (!text) {
        return res.status(400).json({ message: 'Please add a comment text' });
    }

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        const comment = {
            user: req.user.id,
            username: req.user.username,
            text,
        };

        blog.comments.push(comment);
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    commentOnBlog,
};
