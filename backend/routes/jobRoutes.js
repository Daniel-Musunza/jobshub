const express = require('express');
const router = express.Router();
const {
  addjob,
  getjobs,
  deleteJob,
  editjob
} = require('../controllers/jobController');

const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.route('/').get(getjobs).post(protect, upload.single('imageFile'), addjob);
router
  .route('/:id')
  .put(protect, upload.single('imageFile'), editjob).delete(protect, deleteJob);

module.exports = router;
