const asyncHandler = require('express-async-handler');
const db = require('../config/db');

const addjob = async (req, res) => {
  try {
    const { title, email, introduction, description, imageFile, user_id } = req.body;

    // Check if title is missing
    if (!title) {
      res.status(400).json({ message: 'Please fill in all the required fields' });
      return;
    }

    const date = new Date(); // Get the current date and time
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');

    const insertjobQuery = `
              INSERT INTO jobs (
                title,
                email,
                introduction,
                description,
                imageFile,
                date,
                user_id
              ) VALUES (?, ?, ?, ?, ?, ?, ?)
            `;

    const result = await db.query(insertjobQuery, [
      title,
      email,
      introduction,
      description,
      imageFile,
      formattedDate,
      user_id
    ]);

    const newjob = {
      id: result.insertId,
      title,
      email,
      introduction,
      description,
      imageFile: downloadURL, // Use the download URL instead
      date: formattedDate,
      user_id
    };

    res.status(200).json(newjob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

const getjobs = asyncHandler(async (req, res) => {
  const query = 'SELECT * FROM jobs';
  const jobs = await db.query(query);
  res.status(200).json(jobs);
});

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
    email,
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
      email,
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
