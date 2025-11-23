const mongoose = require('mongoose');

// Modèle User minimal utilisé pour les références (populate) depuis microservice2
const userSchema = new mongoose.Schema({
  username: { type: String },
  name: { type: String },
  email: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
