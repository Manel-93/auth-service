const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createSpecies, getAllSpecies, getSpeciesById } = require('../controllers/speciesController');


// Routes pour les espèces
router.post('/', protect, createSpecies);
router.get('/', getAllSpecies);
router.get('/:id', getSpeciesById);

module.exports = router;
