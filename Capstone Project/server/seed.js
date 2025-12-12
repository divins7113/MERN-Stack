const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Blog = require('./models/Blog');

dotenv.config();

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/IDivins-Infographic')
    .then(() => console.log('MongoDB Connected for Seeding'))
    .catch(err => console.error(err));

const seedData = async () => {
    try {
        
        await User.deleteMany({});
        await Blog.deleteMany({});

        const admin = new User({
            username: 'AdminUser',
            email: 'admin@gmail.com',
            password: 'admin123',
            role: 'admin',
            isApproved: true
        });

        const writer = new User({
            username: 'TechWriter',
            email: 'writer@gmail.com',
            password: 'writer123',
            role: 'blog-writer',
            isApproved: true
        });

        const reader = new User({
            username: 'NewsReader',
            email: 'reader@gmail.com',
            password: 'reader123',
            role: 'reader',
            isApproved: true
        });

        await admin.save();
        await writer.save();
        await reader.save();

        console.log('Users Created: Admin, Writer, Reader');

        // Create 5 Sample Blogs
        const blogs = [
            {
                title: 'What is Ransomware?',
                content: 'Ransomware is a type of malware that locks your data and demands payment to unlock it. It often spreads through phishing emails or infected websites. To protect yourself, always back up your data and avoid clicking suspicious links.',
                imageURL: 'https://placehold.co/600x400/e74c3c/ffffff?text=Ransomware',
                author: writer._id,
                likes: [reader._id],
                dislikes: [],
                comments: [{ user: reader._id, username: 'NewsReader', text: 'This is scary stuff! backups are key.' }]
            },
            {
                title: 'How Phishing Works?',
                content: 'Phishing is a cyber attack where attackers pretend to be reputable companies to steal sensitive info like passwords or credit card numbers. Look out for generic greetings, typos, and urgent language in emails.',
                imageURL: 'https://placehold.co/600x400/3498db/ffffff?text=Phishing',
                author: writer._id,
                likes: [],
                dislikes: [],
                comments: []
            },
            {
                title: 'What is MERN Stack?',
                content: 'MERN stands for MongoDB, Express, React, and Node.js. It is a powerful JavaScript stack for building full-stack web applications. MongoDB stores data, Express/Node handle the backend, and React builds the user interface.',
                imageURL: 'https://placehold.co/600x400/2ecc71/ffffff?text=MERN+Stack',
                author: writer._id,
                likes: [admin._id, reader._id],
                dislikes: [],
                comments: []
            },
            {
                title: 'Understanding SQL Injection',
                content: 'SQL Injection is a code injection technique where malicious SQL statements are inserted into entry fields for execution. This can destroy your database or expose sensitive data. Always use parameterized queries to prevent this.',
                imageURL: 'https://placehold.co/600x400/9b59b6/ffffff?text=SQL+Injection',
                author: writer._id,
                likes: [],
                dislikes: [],
                comments: []
            },
            {
                title: 'Introduction to REST APIs',
                content: 'REST (Representational State Transfer) is an architectural style for designing networked applications. It relies on a stateless, client-server, cacheable communications protocol -- and in virtually all cases, the HTTP protocol is used.',
                imageURL: 'https://placehold.co/600x400/f1c40f/ffffff?text=REST+APIs',
                author: writer._id,
                likes: [reader._id],
                dislikes: [],
                comments: [{ user: reader._id, username: 'NewsReader', text: 'Very clear explanation.' }]
            }
        ];

        await Blog.insertMany(blogs);

        console.log('5 Sample Blogs Created');
        console.log('Seeding Completed Successfully');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
