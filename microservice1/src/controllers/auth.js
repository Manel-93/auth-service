// microservice1/src/controllers/auth.js

const User = require('../models/user'); // Utilisez la majuscule pour 'User'
const jwt = require('jsonwebtoken');

// Fonction utilitaire pour générer le token JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  });
};

exports.registerUser = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    // 1. Vérifier si l'utilisateur existe déjà
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }


    const user = await User.create({
      email,
      username,
      password,
    });


    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {

    const user = await User.findOne({ email });

  
    if (user && (await user.matchPassword(password))) {
 
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
exports.getMe = async (req, res) => {
  // Les infos de l'utilisateur sont déjà attachées à req.user par le middleware 'protect'
  res.json(req.user);
};