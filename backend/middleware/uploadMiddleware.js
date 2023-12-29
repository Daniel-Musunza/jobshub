const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'frontend/public/uploads');
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const ext = path.extname(file.originalname);
      cb(null, file.originalname + '-' + uniqueSuffix + ext);
    },
  });
  
  

const upload = multer({
  storage: storage
});



module.exports = { upload };
