const express = require('express');
const router = express.Router();
const {
  addblog,
  getblogs,
  editblog,
  deleteBlog
} = require('../controllers/blogController');

const { protect } = require('../middleware/authMiddleware');
const { upload } = require('../middleware/uploadMiddleware');

router.route('/').get(getblogs).post(protect, upload.single('imageFile'), addblog);
router
  .route('/:id')
  .put(protect, upload.single('imageFile'), editblog).delete(protect, deleteBlog);

module.exports = router;
