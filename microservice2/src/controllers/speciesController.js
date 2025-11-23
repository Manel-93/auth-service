const Species = require('../models/speciesModel');

const createSpecies = async (req, res) => {
  try {
    const { name } = req.body;
    const authorId = req.user.id; // From auth middleware

    const species = new Species({
      authorId,
      name,
    });

    await species.save();
    res.status(201).json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllSpecies = async (req, res) => {
  try {
    const species = await Species.find().populate('authorId', 'username');
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSpeciesById = async (req, res) => {
  try {
    const species = await Species.findById(req.params.id).populate('authorId', 'username');
    if (!species) {
      return res.status(404).json({ message: 'Species not found' });
    }
    res.json(species);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createSpecies,
  getAllSpecies,
  getSpeciesById,
};









