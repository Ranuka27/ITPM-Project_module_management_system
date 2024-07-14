const express = require('express');
const router = express.Router();
const { getResearchreq, insertResearchreq, updateResearchreq, deleteResearchreq, getResearchreqById, getGroupregById } = require('../controllers/Researchreq');

// Route to get all research requests
router.get('/', getResearchreq);

// Route to get a research request by ID
router.get('/:id', getResearchreqById);

// Route to insert a new research request
router.post('/', insertResearchreq);

// Route to update a research request by ID
router.put('/:id', updateResearchreq);

// Route to delete a research request by ID
router.delete('/:id', deleteResearchreq);



module.exports = router;
