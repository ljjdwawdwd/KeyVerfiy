const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

// In-memory "database" for demo purposes
const validKeys = new Set();

// Key generation endpoint
app.post('/api/generate', (req, res) => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let key = 'RAY-';
    for (let i = 0; i < 32; i++) {
        key += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    validKeys.add(key);
    res.json({ success: true, key: key });
});

// Key validation endpoint
app.post('/api/validate', (req, res) => {
    const { key } = req.body;
    
    if (!key) {
        return res.status(400).json({ valid: false, message: "No key provided" });
    }
    
    if (validKeys.has(key)) {
        res.json({ valid: true, message: "Key is valid" });
    } else {
        res.status(401).json({ valid: false, message: "Invalid key" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Key server running on port ${PORT}`);
});
