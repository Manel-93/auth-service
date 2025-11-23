const Observation = require('../models/observationModel');
const Species = require('../models/speciesModel');

// @desc    Créer une nouvelle observation
// @route   POST /api/observations
// @access  Private
const createObservation = async (req, res) => {
  const { speciesId, description } = req.body;

  if (!description) {
    return res.status(400).json({ message: 'Description is required' });
  }

  try {
    //Vérifier si l'espèce existe
    const species = await Species.findById(speciesId);
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }

    //Vérifier si une observation de la même espèce a été soumise dans les 5 dernières minutes
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    const recentObservation = await Observation.findOne({
      speciesId,
      authorId: req.user.id,
      createdAt: { $gte: fiveMinutesAgo }
    });
    if (recentObservation) {
      return res.status(400).json({ message: 'Vous ne pouvez pas soumettre une autre observation pour la même espèce dans les 5 minutes' });
    }

    const observation = await Observation.create({
      speciesId,
      authorId: req.user.id,
      description
    });

    res.status(201).json(observation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Obtenir les observations d'une espèce
// @route   GET /api/species/:id/observations
// @access  Public
const getObservationsBySpecies = async (req, res) => {
  try {
    const observations = await Observation.find({ speciesId: req.params.id }).populate('authorId', 'name').populate('validatedBy', 'name');
    res.json(observations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Valider une observation
// @route   POST /api/observations/:id/validate
// @access  Private
const validateObservation = async (req, res) => {
  try {
    const observation = await Observation.findById(req.params.id);
    if (!observation) {
      return res.status(404).json({ message: 'Observation not found' });
    }

    if (observation.authorId.toString() === req.user.id) {
      return res.status(403).json({ message: 'Vous ne pouvez rejeter votre propre observation' });
    }

    observation.status = 'VALIDATED';
    observation.validatedBy = req.user.id;
    observation.validatedAt = new Date();

    await observation.save();
    res.json(observation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Rejeter une observation
// @route   POST /api/observations/:id/reject
// @access  Private
const rejectObservation = async (req, res) => {
  try {
    const observation = await Observation.findById(req.params.id);
    if (!observation) {
      return res.status(404).json({ message: 'Observation not found' });
    }

    if (observation.authorId.toString() === req.user.id) {
      return res.status(403).json({ message: 'Vous ne pouvez rejeter votre propre observation' });
    }

    observation.status = 'REJECTED';
    observation.validatedBy = req.user.id;
    observation.validatedAt = new Date();

    await observation.save();
    res.json(observation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createObservation,
  getObservationsBySpecies,
  validateObservation,
  rejectObservation
};






