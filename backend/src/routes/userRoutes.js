// // src/routes/userRoutes.js

// const express = require('express');
// const router = express.Router();
// const { protect } = require('../middleware/authMiddleware'); // ✅ Import the correct function
// const userController = require('../controllers/userController'); // Import the controller that handles user-related actions

// // Protected Route: Dashboard (only accessible after authentication)
// router.get('/dashboard', protect, (req, res) => {
//   res.json({ message: 'Welcome to your dashboard!', user: req.user });
// });

// // User Registration Route
// router.post('/register', userController.register);

// // User Login Route
// router.post('/login', userController.login);

// // Update user profile route
// router.put('/update', protect, userController.updateProfile);

// // Logout route
// router.get('/logout', protect, userController.logout);

// module.exports = router;


// src/routes/userRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware'); // ✅ JWT middleware
const userController = require('../controllers/userController'); // ✅ User controller

// ✅ Protected Route: Dashboard
router.get('/dashboard', protect, (req, res) => {
  res.json({ message: 'Welcome to your dashboard!', user: req.user });
});

// ✅ Public Routes
router.post('/register', userController.registerUser); // Rename to match controller
router.post('/login', userController.loginUser);

// ✅ Protected Routes
router.put('/update', protect, userController.updateProfile);
router.get('/logout', protect, userController.logout); // Optional

module.exports = router;



