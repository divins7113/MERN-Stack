const express = require('express');
const router = express.Router();
const {
    getBlogs,
    createBlog,
    updateBlog,
    deleteBlog,
    likeBlog,
    dislikeBlog,
    commentOnBlog,
} = require('../controllers/blogController');
const { protect, blogWriter } = require('../middleware/authMiddleware');

router.route('/').get(getBlogs).post(protect, blogWriter, createBlog);
router.route('/:id').put(protect, blogWriter, updateBlog).delete(protect, blogWriter, deleteBlog);
router.route('/like/:id').put(protect, likeBlog);
router.route('/dislike/:id').put(protect, dislikeBlog);
router.route('/comment/:id').post(protect, commentOnBlog);

module.exports = router;
