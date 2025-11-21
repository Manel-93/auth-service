const express = require('express');
const {
  createObservation,
  getObservationsBySpecies,
  validateObservation,
  rejectObservation
} = require('../controllers/observation');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Routes publiques
router.get('/species/:id/observations', getObservationsBySpecies);

// Routes privées
router.post('/', protect, createObservation);
router.post('/:id/validate', protect, validateObservation);
router.post('/:id/reject', protect, rejectObservation);

module.exports = router;
