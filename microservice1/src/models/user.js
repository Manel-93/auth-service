// microservice1/src/models/User.js

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['USER', 'EXPERT', 'ADMIN'],
    default: 'USER',
  },
  reputation: {
    type: Number,
    default: 0,
  },
  // createdAt est géré automatiquement avec `timestamps: true`
}, {
  timestamps: true // Ajoute automatiquement createdAt et updatedAt
});

// Middleware Mongoose pour hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas été modifié, passer au middleware suivant
  if (!this.isModified('password')) {
    next();
  }

  // Hacher le mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer le mot de passe saisi avec le mot de passe haché
UserSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);