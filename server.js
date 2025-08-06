// server.js
const express = require('express');
const crypto = require('crypto');
const path = require('path');

const app = express();
const PORT = 3000;
const ENCRYPTION_KEY = 'my-super-secret-32-char-key-123'; // 32 characters

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve static files from public directory

// Sample users data
const users = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', salary: 75000 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Developer', salary: 65000 },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Manager', salary: 80000 },
    { id: 4, name: 'Alice Wilson', email: 'alice@example.com', role: 'Designer', salary: 60000 },
    { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', role: 'Developer', salary: 70000 }
];

// Encryption functions
function encrypt(text) {
    try {
        const algorithm = 'aes-256-cbc';
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipher(algorithm, ENCRYPTION_KEY);

        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');

        // Combine IV and encrypted data
        return iv.toString('hex') + ':' + encrypted;
    } catch (error) {
        console.error('Encryption error:', error);
        return null;
    }
}

function decrypt(encryptedData) {
    try {
        const algorithm = 'aes-256-cbc';
        const textParts = encryptedData.split(':');
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = textParts.join(':');

        const decipher = crypto.createDecipher(algorithm, ENCRYPTION_KEY);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
}

// Encryption middleware
const encryptionMiddleware = (req, res, next) => {
    const originalSend = res.send;

    res.send = function (data) {
        // Check if client requests encryption
        if (req.headers['x-encrypt'] === 'true') {
            try {
                const dataString = typeof data === 'object' ? JSON.stringify(data) : data;
                const encryptedData = encrypt(dataString);

                if (encryptedData) {
                    console.log('📦 Sending encrypted response');
                    return originalSend.call(this, {
                        encrypted: encryptedData,
                        message: 'Data is encrypted'
                    });
                }
            } catch (error) {
                console.error('Response encryption error:', error);
            }
        }

        console.log('📤 Sending plain response');
        return originalSend.call(this, data);
    };

    next();
};

// Apply encryption middleware
app.use(encryptionMiddleware);

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Regular API endpoint (no encryption)
app.get('/api/users', (req, res) => {
    console.log('🔓 Plain users request received');
    res.json({
        success: true,
        data: users,
        message: 'Users fetched successfully (plain text)'
    });
});

// Encrypted API endpoint
app.get('/api/users/secure', (req, res) => {
    console.log('🔒 Secure users request received');
    res.json({
        success: true,
        data: users,
        message: 'Users fetched successfully (encrypted)',
        timestamp: new Date().toISOString()
    });
});

// Simple obfuscation endpoint (alternative to encryption)
app.get('/api/users/obfuscated', (req, res) => {
    console.log('🔀 Obfuscated users request received');

    const data = {
        success: true,
        data: users,
        message: 'Users fetched with obfuscation'
    };

    // Simple base64 + reverse obfuscation
    const jsonString = JSON.stringify(data);
    const obfuscated = Buffer.from(jsonString).toString('base64').split('').reverse().join('');

    res.json({
        payload: obfuscated,
        type: 'obfuscated'
    });
});

// Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        encryption: 'Available'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`🔒 Encryption enabled`);
    console.log(`📄 Open http://localhost:${PORT} to see the demo`);
});

module.exports = app;