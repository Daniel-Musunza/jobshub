const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getjobs = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM jobs';
  const jobs = await db.query(query);
  res.status(200).json(jobs);
});

const addjob = async (req, res) => {
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
    const insertjobQuery = `
      INSERT INTO jobs (
        title,
        introduction,
        description,
        imageFile
      ) VALUES (?, ?, ?, ?)
    `;


    const result = await db.query(insertjobQuery, [
        title,
        introduction,
        description,
        imageFile
    ]);

    const newjob = {
      id: result.insertId,
      title,
      introduction,
      description,
      imageFile: imageFile, // Store the filename as a reference
      
    };

    res.status(200).json(newjob);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
const editjob = async (req, res) => {
  try {
    const { id } = req.params;
    

    const { 
      title,
      introduction,
      description,
     } = req.body;

    const findjobQuery = 'SELECT * FROM jobs WHERE id = ?';
    const job = await db.query(findjobQuery, [id]);

    if (job.length === 0) {
      
      return res.status(404).json({ message: 'Job not found' });
     
    }

    let imageFile = null;
    if (req.file) {
      imageFile = req.file.filename; 
      // Access the uploaded file via multer
    }

    // Update the file data in the database
    const updatejobQuery = `
      UPDATE jobs 
      SET 
        title = ?,
        introduction = ?,
        description = ?,
        imageFile = ?
      WHERE id = ?
    `;

    
    await db.query(updatejobQuery, [
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
  getjobs,
  addjob,
  editjob
};
