const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getblogs = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM blogs';
  const blogs = await db.query(query);
  res.status(200).json(blogs);
});

const addblog = async (req, res) => {
  try {
    const { title, introduction, description } = req.body;

    // Check if title is missing
    if (!title) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }

    let imageFile = null;
    if (req.file) {
      imageFile = req.file.filename;
      // Access the uploaded file via multer
    }

    const date = new Date(); // Get the current date and time

    // Format the date as a MySQL DATETIME string
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    // Insert the file data into the database
    const insertblogQuery = `
      INSERT INTO blogs (
        title,
        introduction,
        description,
        imageFile,
        date
      ) VALUES (?, ?, ?, ?, ?)
    `;

    const result = await db.query(insertblogQuery, [
      title,
      introduction,
      description,
      imageFile,
      formattedDate, // Use the formatted date
    ]);

    const newblog = {
      id: result.insertId,
      title,
      introduction,
      description,
      imageFile: imageFile, // Store the filename as a reference
      date: formattedDate, // Respond with the formatted date
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

     const date = Date.now();

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
        imageFile = ?,
        date = ?
      WHERE id = ?
    `;

    
    await db.query(updateblogQuery, [
      title,
      introduction,
      description,
      imageFile,
      date,
      id
    ]);

    res.json({
       id, 
       title,
       introduction,
       description,
       imageFile: imageFile,
       date
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const deleteBlog = asyncHandler(async (req, res) => {
  const blogId = req.params.id;

  // Check if the job with the given ID exists
  const checkQuery = 'SELECT * FROM blogs WHERE id = ?';
  const existingBlog = await db.query(checkQuery, [blogId]);

  if (existingBlog.length === 0) {
    res.status(404).json({ message: 'Blog not found' });
    return;
  }

  // If the job exists, proceed with deletion
  const deleteQuery = 'DELETE FROM blogs WHERE id = ?';
  await db.query(deleteQuery, [blogId]);

  res.json({
    id, 
    title,
    introduction,
    description,
    imageFile: imageFile,
    date
 });
  res.status(200).json({ message: 'Blog deleted successfully' });
});

module.exports = {
  getblogs,
  addblog,
  editblog,
  deleteBlog
};
