# 🔒 Encrypted API Demo Project

A complete Node.js project demonstrating encrypted API responses to protect sensitive data in the network tab.

## 📁 Project Structure

```
encrypted-api-demo/
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── README.md             # This file
└── public/
    └── index.html        # Frontend demo page
```

## 🚀 Quick Start

### 1. Create the project directory

```bash
mkdir encrypted-api-demo
cd encrypted-api-demo
```

### 2. Create the files

Create the following files with the provided code:

-   `server.js` (from the Server artifact)
-   `package.json` (from the Package.json artifact)
-   `public/index.html` (from the HTML artifact)

### 3. Install dependencies

```bash
npm install
```

### 4. Run the server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

### 5. Open your browser

Navigate to: `http://localhost:3000`

## 🔍 Testing the Encryption

1. **Open Developer Tools** (F12) → **Network Tab**
2. **Click the different buttons** to see the API responses:
    - 🔓 **Plain Data**: Readable JSON in network tab
    - 🔐 **Encrypted Data**: Scrambled/encrypted in network tab
    - 🔀 **Obfuscated Data**: Base64 scrambled data
    - 📊 **Compare All**: Side-by-side comparison

## 📋 API Endpoints

| Endpoint                | Method | Encryption     | Description                                            |
| ----------------------- | ------ | -------------- | ------------------------------------------------------ |
| `/api/users`            | GET    | None           | Plain text response                                    |
| `/api/users/secure`     | GET    | AES-256        | Encrypted response (requires `X-Encrypt: true` header) |
| `/api/users/obfuscated` | GET    | Base64+Reverse | Simple obfuscation                                     |
| `/api/health`           | GET    | None           | Health check                                           |

## 🔒 Security Features

### Encryption Method

-   **Algorithm**: AES-256-CBC
-   **Key**: 32-character secret key
-   **IV**: Random 16-byte initialization vector
-   **Format**: `IV:EncryptedData` (hex encoded)

### Headers

-   **Request**: `X-Encrypt: true` to request encrypted response
-   **Response**: `{ "encrypted": "...", "message": "..." }`

## 🎯 What You'll See

### In Network Tab (Plain):

```json
{
    "success": true,
    "data": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "salary": 75000
        }
    ]
}
```

### In Network Tab (Encrypted):

```json
{
    "encrypted": "a1b2c3d4e5f6:9f8e7d6c5b4a3921...",
    "message": "Data is encrypted"
}
```

## 🔧 Customization

### Change Encryption Key

Update the `ENCRYPTION_KEY` in both `server.js` and the HTML file:

```javascript
const ENCRYPTION_KEY = "your-new-32-character-key-here";
```

### Add More Endpoints

```javascript
app.get("/api/your-endpoint", (req, res) => {
    // Your logic here
    res.json({your: "data"});
});
```

## 🚀 Production Considerations

1. **Environment Variables**: Store encryption keys in `.env` files
2. **HTTPS**: Always use HTTPS in production
3. **Key Management**: Use proper secret management systems
4. **Performance**: Consider caching for frequently accessed encrypted data
5. **Error Handling**: Implement proper error handling for encryption failures

## 📝 Sample Users Data

The demo includes 5 sample users with:

-   ID, Name, Email
-   Role (Admin, Developer, Manager, Designer)
-   Salary information (sensitive data that should be encrypted)

## 🔍 How to Verify

1. Start the server
2. Open browser to `http://localhost:3000`
3. Open Network tab in DevTools
4. Click "Fetch Plain Data" - see readable JSON
5. Click "Fetch Encrypted Data" - see encrypted gibberish
6. Notice how sensitive salary data is protected!

## 📚 Next Steps

-   Integrate with your existing Node.js/Express project
-   Add authentication/authorization
-   Implement user-specific encryption keys
-   Add request body encryption for POST/PUT requests
-   Use environment-specific configurations

---

**🎉 Your sensitive API data is now protected from casual inspection in the browser's network tab!**
