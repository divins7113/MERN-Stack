import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ConfirmationModal from '../components/ConfirmationModal';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [blogs, setBlogs] = useState([]);
    const [message, setMessage] = useState('');
    const [mountTime] = useState(new Date().toLocaleTimeString()); // Set only once on mount
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [blogToDelete, setBlogToDelete] = useState(null);
    const [filterRole, setFilterRole] = useState('all');
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteLink, setInviteLink] = useState('');
    const [activeTab, setActiveTab] = useState('invite'); // 'invite', 'users', 'blogs'
    const { token, user: currentUser } = useContext(AuthContext);

    useEffect(() => {
        console.log('AdminDashboard mounted');
        fetchUsers();
        fetchBlogs();
        return () => console.log('AdminDashboard unmounted');
    }, [token]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/admin/users', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchBlogs = async () => {
        try {
            const res = await axios.get('http://localhost:5001/api/blogs');
            setBlogs(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const generateInvite = async (e) => {
        e.preventDefault();
        setMessage('');
        setInviteLink('');

        try {
            const res = await axios.post('http://localhost:5001/api/admin/invite', { email: inviteEmail }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setInviteLink(res.data.inviteLink);
            setMessage(`Invite generated for ${res.data.email}`);
        } catch (error) {
            console.error(error);
            setMessage('Error generating invite: ' + (error.response?.data?.message || 'Error'));
        }
    };

    const approveUser = async (id, e) => {
        if (e) e.preventDefault();
        try {
            await axios.put(`http://localhost:5001/api/admin/approve/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMessage('User approved');
            fetchUsers();
        } catch (error) {
            console.error(error);
            setMessage('Error approving user: ' + (error.response?.data?.message || 'Error approving user'));
        }
    };

    const promptDeleteUser = (id, e) => {
        if (e) e.preventDefault();
        if (id === currentUser._id) {
            alert("You cannot delete yourself!");
            return;
        }
        setUserToDelete(id);
        setBlogToDelete(null); // Ensure we are not deleting blogs
        setIsDeleteModalOpen(true);
    };

    const promptDeleteBlog = (id, e) => {
        if (e) e.preventDefault();
        setBlogToDelete(id);
        setUserToDelete(null); // Ensure we are not deleting user
        setIsDeleteModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (userToDelete) {
            try {
                await axios.delete(`http://localhost:5001/api/admin/user/${userToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage('User deleted successfully');
                await fetchUsers();
            } catch (error) {
                console.error(error);
                setMessage('Error deleting user: ' + (error.response?.data?.message || 'Error deleting user'));
            }
        } else if (blogToDelete) {
            try {
                await axios.delete(`http://localhost:5001/api/blogs/${blogToDelete}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setMessage('Blog deleted successfully');
                await fetchBlogs();
            } catch (error) {
                console.error(error);
                setMessage('Error deleting blog: ' + (error.response?.data?.message || 'Error deleting blog'));
            }
        }

        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        setBlogToDelete(null);
    };

    const handleCancelDelete = () => {
        setIsDeleteModalOpen(false);
        setUserToDelete(null);
        setBlogToDelete(null);
    };

    const filteredUsers = users.filter(user => {
        if (filterRole === 'all') return true;
        return user.role === filterRole;
    });

    return (
        <div>
            <h1>Admin Dashboard (Mounted at: {mountTime})</h1>
            {message && (
                <div style={{ padding: '10px', background: message.toLowerCase().includes('error') ? '#f8d7da' : '#d4edda', color: message.toLowerCase().includes('error') ? '#721c24' : '#155724', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{message}</span>
                    <button onClick={() => setMessage('')} style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 'bold', fontSize: '1.2rem' }}>&times;</button>
                </div>
            )}

            {/* Navigation Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid #ddd', marginBottom: '20px' }}>
                <button
                    onClick={() => setActiveTab('invite')}
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        background: activeTab === 'invite' ? '#007bff' : 'white',
                        color: activeTab === 'invite' ? 'white' : 'black',
                        border: '1px solid #ddd',
                        borderBottom: 'none',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                        marginRight: '5px'
                    }}
                >
                    Invite Admin
                </button>
                <button
                    onClick={() => setActiveTab('users')}
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        background: activeTab === 'users' ? '#007bff' : 'white',
                        color: activeTab === 'users' ? 'white' : 'black',
                        border: '1px solid #ddd',
                        borderBottom: 'none',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px',
                        marginRight: '5px'
                    }}
                >
                    Manage Users
                </button>
                <button
                    onClick={() => setActiveTab('blogs')}
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        background: activeTab === 'blogs' ? '#007bff' : 'white',
                        color: activeTab === 'blogs' ? 'white' : 'black',
                        border: '1px solid #ddd',
                        borderBottom: 'none',
                        borderTopLeftRadius: '5px',
                        borderTopRightRadius: '5px'
                    }}
                >
                    Manage Blogs
                </button>
            </div>

            {activeTab === 'invite' && (
                <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '5px', marginBottom: '30px', background: '#f8f9fa' }}>
                    <h3>Invite New Admin</h3>
                    <form onSubmit={generateInvite} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
                        <div>
                            <label>Email Address:</label>
                            <input
                                type="email"
                                required
                                placeholder="Write an Email Address"
                                value={inviteEmail}
                                onChange={(e) => setInviteEmail(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                        </div>
                        <button type="submit" className='btn' style={{ background: '#007bff' }}>Generate Invite Link</button>
                    </form>
                    {inviteLink && (
                        <div style={{ marginTop: '15px', padding: '10px', background: '#e9ecef', borderRadius: '4px' }}>
                            <strong>Invite Link:</strong><br />
                            <code style={{ wordBreak: 'break-all' }}>{inviteLink}</code>
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'users' && (
                <div>
                    <h2>Manage Users</h2>
                    <div className="form-group" style={{ marginBottom: '20px', maxWidth: '300px' }}>
                        <label htmlFor="roleFilter">Filter by Role:</label>
                        <select
                            id="roleFilter"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                            style={{ padding: '8px', width: '100%', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                            <option value="all">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="blog-writer">Blog Writer</option>
                            <option value="reader">Reader</option>
                        </select>
                    </div>

                    {filteredUsers.length === 0 ? <p>No users found matching current filter.</p> : (
                        <div style={{ marginBottom: '40px' }}>
                            {filteredUsers.map(user => (
                                <div key={user._id} className='pending-user'>
                                    <div>
                                        <strong>{user.username}</strong> ({user.email}) -
                                        <span style={{
                                            marginLeft: '5px',
                                            padding: '2px 5px',
                                            background: user.role === 'admin' ? '#000' : (user.role === 'blog-writer' ? '#007bff' : '#28a745'),
                                            color: '#fff',
                                            borderRadius: '3px',
                                            fontSize: '0.8rem'
                                        }}>
                                            {user.role}
                                        </span>
                                        {user.role === 'blog-writer' && (
                                            <span style={{ marginLeft: '10px', color: user.isApproved ? 'green' : 'orange' }}>
                                                {user.isApproved ? 'Approved' : 'Pending Approval'}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        {user.role === 'blog-writer' && !user.isApproved && (
                                            <button type='button' className='btn' style={{ background: '#28a745', marginRight: '10px' }} onClick={(e) => approveUser(user._id, e)}>Approve</button>
                                        )}
                                        <button type='button' className='btn' style={{ background: '#dc3545' }} onClick={(e) => promptDeleteUser(user._id, e)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {activeTab === 'blogs' && (
                <div>
                    <h2>Manage Blogs</h2>
                    {blogs.length === 0 ? <p>No blogs found.</p> : (
                        <div>
                            {blogs.map(article => (
                                <div key={article._id} className='pending-user' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', borderBottom: '1px solid #eee' }}>
                                    <div>
                                        <strong>{article.title}</strong>
                                        <br />
                                        <span style={{ fontSize: '0.8rem', color: '#666' }}>
                                            By: {article.author?.username || 'Unknown'}
                                        </span>
                                    </div>
                                    <div>
                                        <button type='button' className='btn' style={{ background: '#dc3545' }} onClick={(e) => promptDeleteBlog(article._id, e)}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                message={userToDelete ? "Are you sure you want to delete this user?" : "Are you sure you want to delete this blog?"}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default AdminDashboard;
