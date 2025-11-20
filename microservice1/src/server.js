// microservice1/src/server.js

const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin'); 

dotenv.config();


connectDB();

const app = express();


app.use(express.json());


app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});