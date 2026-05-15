// Neuro AI API - Governance Endpoint

const express = require('express');
const validation = require('../../core/validation/XAIValidation');

const router = express.Router();

let proposals = [];

// Create Proposal
router.post('/proposals', (req, res) => {
  try {
    const proposal = req.body;
    validation.validateAsset(proposal); // Validate the proposal structure

    proposal.id = proposals.length + 1;
    proposals.push(proposal);
    res.status(201).send({ message: 'Proposal created successfully!', proposal });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

// List Proposals
router.get('/proposals', (req, res) => {
  res.status(200).send({ proposals });
});

// Vote on Proposal
router.post('/proposals/:id/vote', (req, res) => {
  try {
    const proposalId = parseInt(req.params.id, 10);
    const { voter, vote } = req.body;

    const proposal = proposals.find((p) => p.id === proposalId);
    if (!proposal) {
      throw new Error('Proposal not found');
    }

    validation.validateTransaction({ from: voter, to: proposalId, amount: vote }); // Validate voting structure

    proposal.votes = proposal.votes || {};
    proposal.votes[voter] = vote;

    res.status(200).send({ message: 'Vote recorded successfully!', proposal });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

module.exports = router;