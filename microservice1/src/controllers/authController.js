const User = require('../models/UserModel'); // Utilisez la majuscule pour 'User'
const jwt = require('jsonwebtoken');

// Fonction utilitaire pour générer le token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

// @desc    Register user
// @route   POST /auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ username });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // 2. Créer un nouvel utilisateur (le hachage du mot de passe se fait dans le middleware du modèle)
    const user = await User.create({
      username,
      email,
      password,
    });

    // 3. Répondre avec les données de l'utilisateur et un token
    res.status(201).json({
      _id: user._id,
      username: user.username,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate user & get token
// @route   POST /auth/login
// @access  Public
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1. Trouver l'utilisateur par email
    const user = await User.findOne({ email });

    // 2. Vérifier l'utilisateur et le mot de passe
    if (user && (await user.matchPassword(password))) {
      // 3. Répondre avec les données de l'utilisateur et un token
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get current user profile
// @route   GET /auth/me
// @access  Private (protégé par JWT)
const getMe = async (req, res) => {
  // Les infos de l'utilisateur sont déjà attachées à req.user par le middleware 'protect'
  res.json({
    _id: req.user._id,
    username: req.user.username,
    role: req.user.role,
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  generateToken,
};




