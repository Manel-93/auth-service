// microservice1/src/controllers/admin.js

const User = require('../models/user');

// @desc    Get all users (Admin only)
// @route   GET /admin/users
// @access  Private/Admin
exports.getAllUsers = async (req, res) => {
  try {
    // Récupérer tous les utilisateurs, exclure le mot de passe
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user role (Admin only)
// @route   PATCH /users/:id/role
// @access  Private/Admin
exports.updateUserRole = async (req, res) => {
  const { role } = req.body;
  const { id } = req.params;

  // S'assurer que le rôle est valide
  if (!['USER', 'EXPERT', 'ADMIN'].includes(role)) {
    return res.status(400).json({ message: 'Invalid role provided' });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.role = role;
    await user.save();

    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      message: 'User role updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};