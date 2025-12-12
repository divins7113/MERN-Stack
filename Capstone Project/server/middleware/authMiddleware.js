const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as an admin' });
    }
};

const blogWriter = (req, res, next) => {
    if (req.user && (req.user.role === 'blog-writer' || req.user.role === 'admin')) {
        if (req.user.role === 'blog-writer' && !req.user.isApproved) {
            return res.status(403).json({ message: 'Blog Writer account not approved yet.' });
        }
        next();
    } else {
        res.status(401).json({ message: 'Not authorized as a blog writer' });
    }
};

module.exports = { protect, admin, blogWriter };
