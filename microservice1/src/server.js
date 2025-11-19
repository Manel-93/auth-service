// microservice1/src/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); // Pour les routes ADMIN

// Charger les variables d'environnement du fichier .env
dotenv.config();

// Connexion à la base de données
connectDB();

const app = express();

// Middleware intégré pour parser le JSON
app.use(express.json());

// Routes
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
// Optionnel: Route pour modifier le rôle, peut être gérée dans adminRoutes ou userRoutes séparées
// app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});