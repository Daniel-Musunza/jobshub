const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getblogs = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM blogs';
  const blogs = await db.query(query);
  res.status(200).json(blogs);
});

const addblog = async (req, res) => {
  try {
    const {
      title,
      introduction,
      description
    } = req.body;

    if (title) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }
    let imageFile = null;
    if(req.file){
      return imageFile = req.file.filename; 
      // Access the uploaded file via multer
    }
   

    // Insert the file data into the database
    const insertblogQuery = `
      INSERT INTO blogs (
        title,
        introduction,
        description,
        imageFile
      ) VALUES (?, ?, ?, ?)
    `;


    const result = await db.query(insertblogQuery, [
        title,
        introduction,
        description,
        imageFile
    ]);

    const newblog = {
      id: result.insertId,
      title,
      introduction,
      description,
      imageFile: imageFile, // Store the filename as a reference
      
    };

    res.status(200).json(newblog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const editblog = async (req, res) => {
  try {
    const { id } = req.params;
    

    const { 
      title,
      introduction,
      description,
     } = req.body;

    const findblogQuery = 'SELECT * FROM blogs WHERE id = ?';
    const blog = await db.query(findblogQuery, [id]);

    if (blog.length === 0) {
      
      return res.status(404).json({ message: 'blog not found' });
     
    }

    let imageFile = null;
    if (req.file) {
      imageFile = req.file.filename; 
      // Access the uploaded file via multer
    }

    // Update the file data in the database
    const updateblogQuery = `
      UPDATE blogs 
      SET 
        title = ?,
        introduction = ?,
        description = ?,
        imageFile = ?
      WHERE id = ?
    `;

    
    await db.query(updateblogQuery, [
      title,
      introduction,
      description,
      imageFile,
      id
    ]);

    res.json({
       id, 
       title,
       introduction,
       description,
       imageFile: imageFile
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = {
  getblogs,
  addblog,
  editblog
};
