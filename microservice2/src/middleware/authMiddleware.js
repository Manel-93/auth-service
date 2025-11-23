const jwt = require('jsonwebtoken');

// Middleware pour protéger les routes et vérifier le token JWT
exports.protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //Extraire le token (Bearer <token>)
      token = req.headers.authorization.split(' ')[1];
      //Vérifier le token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //Attacher les données décodées à la requête
      req.user = decoded;
      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};




