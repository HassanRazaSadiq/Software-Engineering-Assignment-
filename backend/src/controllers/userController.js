// src/controllers/userController.js

// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
// const pool = require('../config/db'); // Assuming you're using MySQL

// const userController = {
//   // User Registration
//   register: async (req, res) => {
//     const { name, email, password } = req.body;

//     try {
//       // Check if user already exists
//       const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//       if (existingUser.length > 0) {
//         return res.status(400).json({ message: 'User already exists' });
//       }

//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       // Insert new user
//       await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
//         name,
//         email,
//         hashedPassword,
//       ]);

//       res.status(201).json({ message: 'User registered successfully!' });
//     } catch (err) {
//       console.error('Registration error:', err);
//       res.status(500).json({ message: 'Server error during registration' });
//     }
//   },

//   // User Login
//   login: async (req, res) => {
//     const { email, password } = req.body;

//     try {
//       const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
//       const user = userRows[0];

//       if (!user) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const isPasswordValid = await bcrypt.compare(password, user.password);
//       if (!isPasswordValid) {
//         return res.status(401).json({ message: 'Invalid email or password' });
//       }

//       const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
//         expiresIn: '1d',
//       });

//       res.json({
//         message: 'User logged in successfully!',
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     } catch (err) {
//       console.error('Login error:', err);
//       res.status(500).json({ message: 'Server error during login' });
//     }
//   },

//   // Update User Profile
//   updateProfile: async (req, res) => {
//     const { name } = req.body;
//     const userId = req.user.id;

//     try {
//       await pool.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
//       res.json({ message: 'User profile updated successfully!' });
//     } catch (err) {
//       console.error('Profile update error:', err);
//       res.status(500).json({ message: 'Server error during profile update' });
//     }
//   },

//   // Logout
//   logout: (req, res) => {
//     // Optionally invalidate token or simply clear it on frontend
//     res.json({ message: 'User logged out successfully!' });
//   },
// };

// module.exports = userController;


const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Assuming you're using MySQL

const userController = {
  // ✅ User Registration
  registerUser: async (req, res) => {
    const { name, email, password } = req.body;

    try {
      // Check if user already exists
      const [existingUser] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insert new user
      await pool.query('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
        name,
        email,
        hashedPassword,
      ]);

      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      console.error('Registration error:', err);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },

  // ✅ User Login
  loginUser: async (req, res) => {
    const { email, password } = req.body;

    try {
      const [userRows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
      const user = userRows[0];

      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      res.json({
        message: 'User logged in successfully!',
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (err) {
      console.error('Login error:', err);
      res.status(500).json({ message: 'Server error during login' });
    }
  },

  // ✅ Update User Profile
  updateProfile: async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
      await pool.query('UPDATE users SET name = ? WHERE id = ?', [name, userId]);
      res.json({ message: 'User profile updated successfully!' });
    } catch (err) {
      console.error('Profile update error:', err);
      res.status(500).json({ message: 'Server error during profile update' });
    }
  },

  // ✅ Logout
  logout: (req, res) => {
    // Optionally invalidate token or simply clear it on frontend
    res.json({ message: 'User logged out successfully!' });
  },
};

module.exports = userController;

