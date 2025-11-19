// src/routes/usersRoute.js
const express = require('express');
const {
    registerUser,
    loginUser,
    getMe,
    getAllUsers,
    updateUserRole,
} = require('../controllers/auth');
const { protect, authorize } = require('../services/authMiddleware');

const router = express.Router();

// --- Routes d'Authentification (Publiques) ---
router.post('/auth/register', registerUser);
router.post('/auth/login', loginUser);

// --- Routes Protégées (Nécessitent un Token) ---
// GET /auth/me
router.get('/auth/me', protect, getMe);

// --- Routes Administrateur (Protégées + Rôle ADMIN) ---
// Route réservée ADMIN : GET /admin/users
router.get('/admin/users', protect, authorize('ADMIN'), getAllUsers);

// ADMIN peut modifier le rôle d'un utilisateur : PATCH /users/:id/role
router.patch('/users/:id/role', protect, authorize('ADMIN'), updateUserRole);


module.exports = router;