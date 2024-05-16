const express = require('express');
const router = express.Router();
const {
  addjob,
  getjobs,
  deleteJob,
  editjob
} = require('../controllers/jobController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(getjobs).post(protect, addjob);
router
  .route('/:id')
  .put(protect, editjob).delete(protect, deleteJob);

module.exports = router;
