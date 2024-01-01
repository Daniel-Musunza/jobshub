const express = require('express');
const router = express.Router();
const {
  addhackathon,
  gethackathons,
  edithackathon,
  deleteHackathon
} = require('../controllers/hackathonController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(gethackathons).post(protect, addhackathon);
router
  .route('/:id')
  .put(protect, edithackathon).delete(protect, deleteHackathon);

module.exports = router;
