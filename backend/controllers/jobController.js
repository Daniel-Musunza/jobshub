const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const getjobs = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM jobs';
  const jobs = await db.query(query);
  res.status(200).json(jobs);
});

const addjob = async (req, res) => {
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
    const insertjobQuery = `
      INSERT INTO jobs (
        title,
        introduction,
        description,
        imageFile,
        date
      ) VALUES (?, ?, ?, ?, ?)
    `;

    const result = await db.query(insertjobQuery, [
      title,
      introduction,
      description,
      imageFile,
      formattedDate, // Use the formatted date
    ]);

    const newjob = {
      id: result.insertId,
      title,
      introduction,
      description,
      imageFile: imageFile, // Store the filename as a reference
      date: formattedDate, // Respond with the formatted date
    };

    res.status(200).json(newjob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const deleteJob = asyncHandler(async (req, res) => {
  const jobId = req.params.id;

  // Check if the job with the given ID exists
  const checkQuery = 'SELECT * FROM jobs WHERE id = ?';
  const existingJob = await db.query(checkQuery, [jobId]);

  if (existingJob.length === 0) {
    res.status(404).json({ message: 'Job not found' });
    return;
  }

  // If the job exists, proceed with deletion
  const deleteQuery = 'DELETE FROM jobs WHERE id = ?';
  await db.query(deleteQuery, [jobId]);

  res.json({
    id, 
    title,
    introduction,
    description,
    imageFile: imageFile,
    date
 });
  res.status(200).json({ message: 'Job deleted successfully' });
});

const editjob = async (req, res) => {
  try {
    const { id } = req.params;
    

    const { 
      title,
      introduction,
      description
     } = req.body;
     const date = Date.now();
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
        imageFile = ?,
        date = ?
      WHERE id = ?
    `;

    
    await db.query(updatejobQuery, [
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

module.exports = {
  getjobs,
  addjob,
  deleteJob,
  editjob
};
