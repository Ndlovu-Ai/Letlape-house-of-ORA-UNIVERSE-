// Neuro AI API - AI Engine Endpoint

const express = require('express');
const ndlovuAI = require('../../core/ai-engine/index');

const router = express.Router();

// Bootstrap AI Engine
router.get('/bootstrap', (req, res) => {
  ndlovuAI.bootstrap();
  res.status(200).send('AI Engine bootstrapped successfully.');
});

// Execute AI Logic
router.post('/execute', (req, res) => {
  const { task } = req.body;
  ndlovuAI.executeLogic(task);
  res.status(200).send(`AI executed task: ${task}`);
});

module.exports = router;