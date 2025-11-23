// microservice1/src/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoute');
const adminRoutes = require('./routes/adminRoute'); 

// 1. Charger les variables d'environnement
dotenv.config();

// 2. Connexion à la base de données MongoDB
connectDB();

const app = express();

// 🚨 CORRECTION CRUCIALE : Appeler la fonction express.json()
// La ligne DOIT inclure les parenthèses () pour que le middleware soit activé
app.use(express.json());

// Routes (doivent venir APRÈS le middleware JSON)
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);

// Middleware pour capturer les erreurs de parsing JSON (body-parser / express.json)
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Invalid JSON received:', err.message);
    return res.status(400).json({ message: 'Invalid JSON', error: err.message });
  }
  next();
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
module.exports = app;