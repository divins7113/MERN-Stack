const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

const registerUser = async (req, res) => {
    const { username, email, password, role } = req.body;
    console.log('Register Request:', req.body);

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            console.log('User already exists');
            return res.status(400).json({ message: 'User already exists' });
        }

        let isApproved = false;
        if (role === 'reader') isApproved = true;
        if (role === 'admin') isApproved = true;
        if (role === 'blog-writer') isApproved = false;

        console.log('Creating user with approval:', isApproved);

        const user = await User.create({
            username,
            email,
            password,
            role,
            isApproved,
        });

        if (user) {
        
            console.log('User created:', user._id);
            res.status(201).json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id), 
            });
        } else {
            console.log('User creation returned null');
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            if (user.role === 'reporter' && !user.isApproved) {
                return res.status(403).json({ message: 'Account pending approval' }); // BLOCKS LOGIN
            }

            res.json({
                _id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                token: generateToken(user.id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getMe = async (req, res) => {
    res.status(200).json(req.user);
};

module.exports = {
    registerUser,
    loginUser,
    getMe,
};
