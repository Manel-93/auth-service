// microservice1/src/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); 

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


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});