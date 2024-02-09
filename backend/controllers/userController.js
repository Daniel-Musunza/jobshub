const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const db = require('../config/db'); // Your MySQL connection

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, "abc123", {
    expiresIn: '30d',
  });

};

// @desc    Register new user
// @route   POST /api/users/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error('Please add all fields');
    }

    // Check if user exists
    const checkUserQuery = 'SELECT * FROM users WHERE email = ?';
    const existingUser = await db.query(checkUserQuery, [email]);

    if (existingUser.length > 0) {
      res.status(400);
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Insert user into the database
    const insertUserQuery = `
      INSERT INTO users (name, email, password)
      VALUES (?, ?, ?)
    `;

    const insertUserValues = [
      name,
      email,
      hashedPassword,
    ];

    const result = await db.query(insertUserQuery, insertUserValues);

    if (result.affectedRows === 1) {
      const userId = result.insertId;
      const token = generateToken(userId);

      res.status(201).json({
        id: userId,
        name,
        email,
        hashedPassword,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
      throw new Error('Invalid user data');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});



// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    const getUserQuery = 'SELECT * FROM users WHERE email = ?';
    const users = await db.query(getUserQuery, [email]);

    if (users.length === 1 && (await bcrypt.compare(password, users[0].password))) {
      const user = users[0];
      const token = generateToken(user.id);

      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        userType: user.userType,
        description: user.description,
        location: user.location,
        casualJobs: user.casualJobs,
        proffessionalJobs: user.proffessionalJobs,
        profileImage: user.profileImage,
        link: user.link,
        token,
      });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
      throw new Error('Invalid credentials');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const getUserQuery = 'SELECT * FROM users WHERE id = ?';
    const users = await db.query(getUserQuery, [userId]);

    if (users.length === 1) {
      const user = users[0];
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error('User not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const getUsers = asyncHandler(async (req, res) => {
  try {
    const getAllUsersQuery = 'SELECT * FROM users';
    const users = await db.query(getAllUsersQuery);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

const updateUser = asyncHandler(async (req, res) => {
  try {
    const { id, name, email, phoneNumber, userType, description, location, casualJobs, proffessionalJobs, link } = req.body;

    let imageFile = null;
    let updateUserQuery;

    if (req.file) {
      imageFile = req.file.filename;
      updateUserQuery = `UPDATE users 
        SET name = ?, 
        email = ?, 
        phoneNumber = ?, 
        userType = ?, 
        description = ?, 
        location = ?, 
        casualJobs = ?, 
        proffessionalJobs = ?, 
        profileImage = ? ,
        link = ? 
        WHERE id = ?`;
      await db.query(updateUserQuery, [name, email, phoneNumber, userType, description, location, casualJobs, proffessionalJobs, imageFile, link, id]);
    } else {
      updateUserQuery = `UPDATE users 
        SET name = ?, 
        email = ?, 
        phoneNumber = ?, 
        userType = ?, 
        description = ?, 
        location = ?, 
        casualJobs = ?, 
        proffessionalJobs = ?,
        link = ?  
        WHERE id = ?`;
      await db.query(updateUserQuery, [name, email, phoneNumber, userType, description, location, casualJobs, proffessionalJobs, link, id]);
    }

    // Fetch user data after update
    const userQuery = `SELECT * FROM users WHERE id = ?`;
    const [user] = await db.query(userQuery, [id]);

    // Generate token (assuming you have a function for that)
    const token = generateToken(user.id);

    // Send JSON response with user data and token
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      userType: user.userType,
      description: user.description,
      location: user.location,
      casualJobs: user.casualJobs,
      proffessionalJobs: user.proffessionalJobs,
      profileImage: user.profileImage,
      link: user.link,
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});






// };
console.log(generateToken);
module.exports = {
  registerUser,
  loginUser,
  getMe,
  getUsers,
  updateUser,
};
