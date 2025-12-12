import { useState, useContext, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: 'reader',
        inviteToken: ''
    });
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [searchParams] = useSearchParams();

    const { register } = useContext(AuthContext);
    const navigate = useNavigate();

    const { username, email, password, role, inviteToken } = formData;

    useEffect(() => {
        const tokenFromUrl = searchParams.get('token');
        const emailFromUrl = searchParams.get('email');
        if (tokenFromUrl && emailFromUrl) {
            setFormData(prev => ({
                ...prev,
                role: 'admin',
                inviteToken: tokenFromUrl,
                email: emailFromUrl
            }));
            setMessage('Admin invite detected! Please complete your registration.');
        }
    }, [searchParams]);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');

        const res = await register(username, email, password, role, inviteToken);
        if (res.success) {
            if (role === 'blog-writer') {
                setMessage('Registration successful! Please wait for Admin approval before logging in.');
            } else {
                setMessage('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000);
            }
        } else {
            setError(res.message);
        }
    };

    return (
        <div className='form-container'>
            <h1>Register</h1>
            {error && <div className='error'>{error}</div>}
            {message && <div className='success' style={{ backgroundColor: '#d4edda', color: '#155724', padding: '10px', marginBottom: '10px' }}>{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className='form-group'>
                    <label>Username</label>
                    <input type='text' name='username' value={username} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' name='email' value={email} onChange={onChange} required readOnly={!!searchParams.get('email')} />
                    {role === 'admin' && <small style={{ color: '#666' }}>Must be a Gmail address</small>}
                </div>
                <div className='form-group'>
                    <label>Password</label>
                    <input type='password' name='password' value={password} onChange={onChange} required />
                </div>
                <div className='form-group'>
                    <label>Role</label>
                    <select name='role' value={role} onChange={onChange} disabled={!!searchParams.get('token')}>
                        <option value="reader">Reader</option>
                        <option value="blog-writer">Blog Writer</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                {role === 'admin' && (
                    <div className='form-group'>
                        <label>Invite Token</label>
                        <input
                            type='text'
                            name='inviteToken'
                            value={inviteToken}
                            onChange={onChange}
                            required
                            placeholder="Required for Admin"
                            readOnly={!!searchParams.get('token')}
                        />
                    </div>
                )}
                <button type='submit' className='btn btn-block'>Register</button>
            </form>
        </div>
    );
};

export default Register;
