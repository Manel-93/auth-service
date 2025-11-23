const express = require('express');
const {
  createObservation,
  getObservationsBySpecies,
  validateObservation,
  rejectObservation
} = require('../controllers/observationController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Routes publiques
router.get('/species/:id/observations', getObservationsBySpecies);

// Routes privées
router.post('/', protect, createObservation);
router.post('/:id/validate', protect, validateObservation);
router.post('/:id/reject', protect, rejectObservation);

module.exports = router;
