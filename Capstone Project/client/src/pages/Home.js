import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const Home = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [commentText, setCommentText] = useState({}); 
    const [visibleComments, setVisibleComments] = useState({}); 

    const { token, user } = useContext(AuthContext); 

    const fetchNews = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/blogs');
            setNews(res.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleLike = async (id) => {
        if (!user) return alert('Please login to like');
        try {
            await axios.put(`http://localhost:5001/api/blogs/like/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNews(); 
        } catch (err) {
            console.error(err);
        }
    };

    const handleDislike = async (id) => {
        if (!user) return alert('Please login to dislike');
        try {
            await axios.put(`http://localhost:5001/api/blogs/dislike/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchNews();
        } catch (err) {
            console.error(err);
        }
    };

    const handleCommentSubmit = async (id, e) => {
        e.preventDefault();
        if (!user) return alert('Please login to comment');
        const text = commentText[id];
        if (!text) return;

        try {
            await axios.post(`http://localhost:5001/api/blogs/comment/${id}`, { text }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setCommentText({ ...commentText, [id]: '' });
            fetchNews();
        } catch (err) {
            console.error(err);
        }
    };

    const toggleComments = (id) => {
        setVisibleComments({ ...visibleComments, [id]: !visibleComments[id] });
    };

    const filteredNews = news.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) return <div>Loading news...</div>;

    return (
        <div>
            <h1>Latest Blogs</h1>

            <div className="form-group" style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        fontSize: '1rem',
                        border: '1px solid #ddd',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {filteredNews.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                filteredNews.map((item) => (
                    <div key={item._id} className='news-card' style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
                        {item.imageURL && <img src={item.imageURL} alt={item.title} style={{ maxWidth: '100%', height: 'auto' }} />}
                        <h2>{item.title}</h2>
                        <div className='news-meta' style={{ color: '#666', fontSize: '0.9rem', marginBottom: '10px' }}>
                            Posted by {item.author?.username || 'Unknown'} on{' '}
                            {new Date(item.createdAt).toLocaleDateString()}
                        </div>
                        <p>{item.content}</p>

                        <div className="engagement-section" style={{ marginTop: '15px', borderTop: '1px solid #eee', paddingTop: '10px' }}>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '10px' }}>
                                <button onClick={() => handleLike(item._id)} style={{ cursor: 'pointer', background: 'none', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '15px', color: item.likes.includes(user?._id) ? 'blue' : 'black' }}>
                                    Like ({item.likes.length})
                                </button>
                                <button onClick={() => handleDislike(item._id)} style={{ cursor: 'pointer', background: 'none', border: '1px solid #ddd', padding: '5px 10px', borderRadius: '15px', color: item.dislikes.includes(user?._id) ? 'red' : 'black' }}>
                                    Dislike ({item.dislikes.length})
                                </button>
                                <button onClick={() => toggleComments(item._id)} style={{ cursor: 'pointer', background: 'none', border: 'none', color: '#007bff', textDecoration: 'underline' }}>
                                    {visibleComments[item._id] ? 'Hide Comments' : `View Comments (${item.comments.length})`}
                                </button>
                            </div>

                            {visibleComments[item._id] && (
                                <div className="comments-section" style={{ background: '#f9f9f9', padding: '10px', borderRadius: '5px' }}>
                                    {item.comments.map((comment, index) => (
                                        <div key={index} style={{ borderBottom: '1px solid #eee', paddingBottom: '5px', marginBottom: '5px' }}>
                                            <strong>{comment.username}</strong>: {comment.text}
                                        </div>
                                    ))}
                                    <form onSubmit={(e) => handleCommentSubmit(item._id, e)} style={{ display: 'flex', marginTop: '10px' }}>
                                        <input
                                            type="text"
                                            placeholder="Write a comment..."
                                            value={commentText[item._id] || ''}
                                            onChange={(e) => setCommentText({ ...commentText, [item._id]: e.target.value })}
                                            style={{ flex: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                                        />
                                        <button type="submit" style={{ marginLeft: '10px', padding: '8px 15px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Post</button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default Home;
