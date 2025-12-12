import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import BlogWriterDashboard from './pages/BlogWriterDashboard';
import Header from './components/Header';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

// Protected Route Component
const PrivateRoute = ({ children, roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<PrivateRoute roles={['admin', 'blog-writer', 'reader']}><Home /></PrivateRoute>} />


              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route
                path="/admin"
                element={
                  <PrivateRoute roles={['admin']}>
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />

              <Route
                path="/blog-writer"
                element={
                  <PrivateRoute roles={['blog-writer', 'admin']}>
                    {/* Admin should technically be able to see it or not? Prompt says Admin has full CRUD. */}
                    <BlogWriterDashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
