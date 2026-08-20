const express = require('express');
const app = express();

app.use(express.json());

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'UP', timestamp: new Date().toISOString() });
});

// User Search Endpoint (with input sanitization practice)
app.get('/api/users/search', (req, res) => {
  const username = req.query.username;

  if (!username || typeof username !== 'string') {
    return res.status(400).json({ error: 'Invalid or missing username query parameter.' });
  }

  const sanitizedUser = username.replace(/[^a-zA-Z0-9_]/g, '');
  
  return res.status(200).json({
    message: 'User query processed safely',
    query: sanitizedUser
  });
});

module.exports = app;