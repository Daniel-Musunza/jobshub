const express = require('express')
const router = express.Router()
const {
  registerUser,
  loginUser,
  forgotPassword,
  passwordreset,
  getUsers,
  updateUser,
  getMe,
} = require('../controllers/userController')
const { protect } = require('../middleware/authMiddleware');


router.post('/', registerUser)
router.post('/login', loginUser)
router.post('/forgotpassword', forgotPassword)
router.post('/passwordreset', passwordreset)
router.get('/getUsers', getUsers)
router.get('/me', protect, getMe)
router.route('/:id').put(protect, updateUser);

module.exports = router
