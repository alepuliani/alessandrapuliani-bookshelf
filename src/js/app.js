// src/app.js
const express = require('express');
const path = require('path');
const setupProxy = require('./setupProxy');

const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Setup the proxy
setupProxy(app);

// Define a catch-all route to serve the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
