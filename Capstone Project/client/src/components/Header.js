import { Link } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">IDivins Infographics</Link>
            </div>
            <nav>
                <ul>
                    {user ? (
                        <>
                            <li>Hello, {user.username} </li>
                            <li><Link to="/">Feed</Link></li>
                            {user.role === 'blog-writer' && <li><Link to="/blog-writer">Dashboard</Link></li>}
                            {user.role === 'admin' && (
                                <>
                                    <li><Link to="/blog-writer">Dashboard</Link></li>
                                    <li><Link to="/admin">Manage</Link></li>
                                </>
                            )}
                            <li><button onClick={logout}>Logout</button></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
