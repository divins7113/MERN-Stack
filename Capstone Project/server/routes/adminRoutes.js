const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const AdminInvite = require('../models/AdminInvite');
const crypto = require('crypto');
const User = require('../models/User');

router.post('/invite', protect, admin, async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required' });
    }

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const token = crypto.randomBytes(20).toString('hex');

        const invite = await AdminInvite.create({
            email,
            token,
            createdBy: req.user.id
        });

        res.status(201).json({
            email: invite.email,
            token: invite.token,
            inviteLink: `http://localhost:3000/register?token=${invite.token}&email=${invite.email}`
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const getUsers = async (req, res) => {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await user.deleteOne();
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const approveUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            user.isApproved = true;
            await user.save();
            res.json({ message: 'User approved' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

router.get('/users', protect, admin, getUsers);
router.delete('/user/:id', protect, admin, deleteUser);
router.put('/approve/:id', protect, admin, approveUser);

module.exports = router;
