// Neuro AI API - Treasury Endpoint

const express = require('express');
const treasury = require('../../core/treasury/index');

const router = express.Router();

// Initialize Treasury
router.get('/initialize', (req, res) => {
  treasury.initialize();
  res.status(200).send('Treasury initialized successfully.');
});

// Manage Assets
router.post('/assets', (req, res) => {
  const assetData = req.body;
  treasury.manageAssets(assetData);
  res.status(200).send(`Assets managed: ${JSON.stringify(assetData)}`);
});

module.exports = router;