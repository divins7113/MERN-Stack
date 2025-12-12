import { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const BlogWriterDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageURL, setImageURL] = useState('');
    const [message, setMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);

    const { user, token } = useContext(AuthContext);

    const fetchBlogs = useCallback(async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/blogs');

            if (user) {
                setBlogs(res.data.filter(blog => blog.author._id === user._id));
            }
        } catch (err) {
            console.error(err);
        }
    }, [user]);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const blogData = { title, content, imageURL };

        try {
            if (editMode) {
                await axios.put(`http://localhost:5001/api/blogs/${currentBlogId}`, blogData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('Blog updated successfully');
            } else {
                await axios.post('http://localhost:5001/api/blogs', blogData, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setMessage('Blog created successfully');
            }
            setTitle('');
            setContent('');
            setImageURL('');
            setEditMode(false);
            setCurrentBlogId(null);
            fetchBlogs();
        } catch (err) {
            console.error(err);
            setMessage('Error processing request');
        }
    };

    const handleEdit = (blog) => {
        setTitle(blog.title);
        setContent(blog.content);
        setImageURL(blog.imageURL || '');
        setCurrentBlogId(blog._id);
        setEditMode(true);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axios.delete(`http://localhost:5001/api/blogs/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage('Blog deleted successfully');
            fetchBlogs();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>Blog Writer Dashboard</h1>
            {message && <div style={{ color: 'green', marginBottom: '10px' }}>{message}</div>}

            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Image URL</label>
                    <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} placeholder="https://example.com/image.jpg" />
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea value={content} onChange={(e) => setContent(e.target.value)} required rows="5"></textarea>
                </div>
                <button type="submit" className="btn">{editMode ? 'Update' : 'Create'} Blog</button>
                {editMode && <button type="button" className="btn" style={{ marginLeft: '10px', background: '#666' }} onClick={() => {
                    setEditMode(false);
                    setTitle('');
                    setContent('');
                    setImageURL('');
                    setCurrentBlogId(null);
                }}>Cancel Edit</button>}
            </form>

            <h2>My Blogs</h2>
            {blogs.length === 0 ? <p>No blogs found.</p> : (
                blogs.map(blog => (
                    <div key={blog._id} className="blog-item" style={{ border: '1px solid #ddd', padding: '10px', marginBottom: '10px' }}>
                        <h3>{blog.title}</h3>
                        {blog.imageURL && <img src={blog.imageURL} alt={blog.title} style={{ maxWidth: '200px', display: 'block', marginBottom: '10px' }} />}
                        <p>{blog.content.substring(0, 100)}...</p>
                        <button className="btn" style={{ marginRight: '5px' }} onClick={() => handleEdit(blog)}>Edit</button>
                        <button className="btn" style={{ background: '#dc3545' }} onClick={() => handleDelete(blog._id)}>Delete</button>
                    </div>
                ))
            )}
        </div>
    );
};

export default BlogWriterDashboard;
