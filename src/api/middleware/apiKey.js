// Simple API Key Middleware
require('dotenv').config();
const API_KEY = process.env.API_KEY; // Read API key from .env

module.exports = function(req, res, next) {
  const key = req.header('x-api-key');
  if (!key || key !== API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key.' });
  }
  next();
};