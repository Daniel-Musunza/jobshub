const express = require('express');
const router = express.Router();
const {
  addmessage,
  subscribe,
  getmessages
} = require('../controllers/contactController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getmessages).post(addmessage);
router.route('/subscribe').post(subscribe);
module.exports = router;
