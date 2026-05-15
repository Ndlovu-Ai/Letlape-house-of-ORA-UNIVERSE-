// Neuro AI API Server

const express = require('express');
const bodyParser = require('body-parser');
const treasuryRoutes = require('./endpoints/treasury');
const aiRoutes = require('./endpoints/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/treasury', treasuryRoutes);
app.use('/api/ai', aiRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Neuro AI Server running on port ${PORT}`);
});