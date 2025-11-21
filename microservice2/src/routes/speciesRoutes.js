const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { createSpecies, getAllSpecies, getSpeciesById } = require('../controllers/species');


// Routes pour les espèces
router.post('/', protect, createSpecies);
router.get('/', getAllSpecies);
router.get('/:id', getSpeciesById);

module.exports = router;
