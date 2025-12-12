const User = require('../models/User');

const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const approveUser = async (req, res) => {
    try {
        console.log('Approving user:', req.params.id);
        const user = await User.findById(req.params.id);

        if (user) {
            user.isApproved = true;
            const updatedUser = await user.save();
            console.log('User approved:', updatedUser);
            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                isApproved: updatedUser.isApproved
            });
        } else {
            console.log('User not found in approve');
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Approve User Error:', error);
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
        console.log(error)
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getUsers,
    approveUser,
    deleteUser
};
