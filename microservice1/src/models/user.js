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
}, {
  timestamps: true 
});

// Middleware Mongoose pour hacher le mot de passe avant de sauvegarder l'utilisateur
UserSchema.pre('save', async function(next) {
  // Si le mot de passe n'a pas été modifié (ex: mise à jour du rôle), on passe immédiatement
  if (!this.isModified('password')) {
    // 🚨 CORRECTION : Il est plus sûr d'utiliser 'return next()' dans le 'if'
    // pour garantir que l'exécution s'arrête ici.
    return next();
  }

  // Hacher le mot de passe
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);

  // Passer à l'étape de sauvegarde après le hachage
  next();
});

// Méthode pour comparer le mot de passe saisi avec le mot de passe haché (Utilisé au login)
UserSchema.methods.matchPassword = async function(enteredPassword) {
  // Utilise bcrypt.compare pour vérifier si le mot de passe en clair (enteredPassword)
  // correspond au hash stocké (this.password)
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);