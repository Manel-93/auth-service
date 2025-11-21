const express = require('express');
const { getAllUsers, updateUserRole } = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Middleware de protection et d'autorisation pour toutes les routes Admin
router.use(protect, authorize('ADMIN'));

// Route pour lister tous les utilisateurs
router.route('/users').get(getAllUsers); // GET /admin/users

// Route pour modifier le rôle d'un utilisateur
// Note: on utilise la route PATCH /users/:id/role comme demandé dans la consigne
router.route('/users/:id/role').patch(updateUserRole); // PATCH /admin/users/:id/role

module.exports = router;