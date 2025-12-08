const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve static files

// Routes
app.use("/api/auth", require("./routes/auth"));

// Keep existing item routes
const Item = require('./models/itemModel'); // Import the model
const basicAuth = require('./middleware/basicAuth'); // Import Basic Auth middleware

// Item Routes
// Create a new Item
app.post('/api/items', basicAuth, async (req, res) => {
    try {
        const newItem = new Item(req.body); // req.body contains the JSON data
        const savedItem = await newItem.save();
        res.status(201).json(savedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Read all Items
app.get('/api/items', basicAuth, async (req, res) => {
    try {
        const items = await Item.find(); // Find all documents
        res.status(200).json({ message: "Authorization Granted", items });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Read a single Item by ID
app.get('/api/items/:id', basicAuth, async (req, res) => {
    try {
        const item = await Item.findById(req.params.id); // Find a document by its ID
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update an Item by ID
app.patch('/api/items/:id', basicAuth, async (req, res) => {
    try {
        const updatedItem = await Item.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true } // {new: true} returns the modified document
        );
        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an Item by ID
app.delete('/api/items/:id', basicAuth, async (req, res) => {
    try {
        const deletedItem = await Item.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));