const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

// Middleware pour protéger les routes et vérifier le token JWT
exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attacher l'utilisateur à la requête (sauf le mot de passe)
    req.user = await User.findById(decoded.id).select('-password');
    return next();
  } catch (error) {
    console.error('JWT verification failed:', error.message || error);
    return res.status(401).json({ message: 'Not authorized, token failed', error: error.message });
  }
};

// Middleware pour restreindre l'accès à certains rôles
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this route`,
      });
    }

    next();
  };
};




