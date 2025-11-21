const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Charger les variables d'environnement le plus tôt possible
dotenv.config();

const speciesRoutes = require('./routes/speciesRoutes');
const observationRoutes = require('./routes/observationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
  
// Routes
app.use('/api/species', speciesRoutes);
app.use('/api/observations', observationRoutes);

// Connect to MongoDB (support both MONGODB_URI and MONGO_URI env names)
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI;
console.log('Using Mongo URI:', !!mongoUri);
console.log('JWT_SECRET set:', !!process.env.JWT_SECRET);

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Start server
app.listen(PORT, () => {
  console.log(`Observation service running on port ${PORT}`);
});

module.exports = app;



