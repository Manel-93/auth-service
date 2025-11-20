// microservice1/src/routes/admin.js

const express = require('express');
const { getAllUsers, updateUserRole } = require('../controllers/admin');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();


router.use(protect, authorize('ADMIN'));


router.route('/users').get(getAllUsers); 

router.route('/users/:id/role').patch(updateUserRole); 

module.exports = router;