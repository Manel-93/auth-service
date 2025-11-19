// microservice1/src/routes/auth.js

const express = require('express');
const { registerUser, loginUser, getMe } = require('../controllers/auth');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.post('/register', registerUser); // POST /auth/register
router.post('/login', loginUser);       // POST /auth/login
router.get('/me', protect, getMe);      // GET /auth/me (Protégée)

module.exports = router;